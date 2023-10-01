import { Center, FormControl, InputGroup, InputLeftElement, Icon, Input, Box, Text, FormErrorMessage, Flex } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import Logo from '../Logo/logo';
import BottomText from '../Bottom text/bottomText';
import SubmitButton from '../Buttons/submitButton';
import Greeting from '../Greetings texts/greeting';
import { signIn } from '../../services/apis/authApi';
import FormHelperText from '../Form helper text/formHelperText';
import { useNavigate } from 'react-router-dom';

export type LoginFormData = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit = async (values: LoginFormData) => {
		try {
			const result = await signIn(values);
			if (result?.data?.status === 'success') {
				localStorage.setItem('token', result?.data?.token);
				navigate('/home');
			}
		} catch (error) {
			console.error('Error message from login form:', error);
		}
	};

	return (
		<Flex
			flex={0.5}
			direction={'column'}
			justify={'center'}>
			<Box
				p={'1rem'}
				m={'0 auto'}
				w={'25rem'}>
				<Center
					pos={'relative'}
					top={'-4rem'}
					left={'-.75rem'}>
					<Logo />
				</Center>

				<>
					<Greeting
						text={'Good To See You Again!'}
						emoji={true}
					/>
				</>
				<>
					<FormHelperText text={'	Sign in to your account to continue'} />
				</>

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
								_placeholder={{ color: '#808080' }}
								border={'1px solid'}
								{...register('email')}
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
								_placeholder={{ color: '#808080' }}
								border={'1px solid'}
								{...register('password')}
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
					<Box mt={'2rem'}>
						<SubmitButton text={'Sign In'} />
					</Box>
				</form>
				<>
					<BottomText
						text={"Don't"}
						link={'register'}
					/>
				</>
			</Box>
		</Flex>
	);
};

export default LoginForm;
