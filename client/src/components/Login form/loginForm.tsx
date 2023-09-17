import { FormControl, InputGroup, InputLeftElement, Icon, Input, Box, Text, FormErrorMessage, Flex, Button, Heading, Image } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import wavingHand from './../../assets/waving-hand.png';
import Logo from '../Logo/logo';

export type LoginFormData = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit = async (data: LoginFormData) => {
		console.log(data);
	};

	return (
		<Flex
			flex={0.5}
			direction={'column'}
			justify={'center'}>
			<Box
				p={'1rem'}
				m={'0 auto'}
				w={'24rem'}>
				<Box
					pos={'relative'}
					top={'-3rem'}
					left={'-.5rem'}>
					<Logo />
				</Box>
				<Flex align={'center'}>
					<Heading
						mb={'3rem'}
						fontWeight={'600'}>
						Good To See You Again!
					</Heading>
					<Image
						pos={'relative'}
						left={'-11rem'}
						src={wavingHand}
						boxSize={'3rem'}></Image>
				</Flex>

				<Text
					fontSize={'1rem'}
					color={'#808080'}
					fontWeight={'500'}>
					Sign in to your account to continue
				</Text>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						isRequired
						mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={HiOutlineMail} />
							</InputLeftElement>
							<Input
								id="email"
								placeholder="example@example.com"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('email', {
									minLength: { value: 4, message: 'Minimum length should be 4' },
								})}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						mt={'1.5rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={AiOutlineLock} />
							</InputLeftElement>
							<Input
								id="password"
								placeholder="Password"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('password', {
									minLength: { value: 8, message: 'Minimum length should be 8' },
								})}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
					</FormControl>
					<Text
						textAlign={'right'}
						mt={'1rem'}
						color={'#264653'}
						fontWeight={'500'}>
						Forgot Password?
					</Text>

					<Button
						mt={'2rem'}
						color={'primary'}
						bg={'cta'}
						borderRadius={'2rem'}
						w={'full'}>
						Sign In
					</Button>
				</form>
				<Text mt={'1rem'}>
					Don't have an account?
					<span>
						<a style={{ marginLeft: '.75rem', color: '#264653', textDecoration: 'underline' }}>Register</a>
					</span>
				</Text>
			</Box>
		</Flex>
	);
};

export default LoginForm;
