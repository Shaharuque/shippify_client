import { useForm } from 'react-hook-form';
import { Center, Flex, Box, FormControl, Input, InputGroup, InputLeftElement, FormErrorMessage, Icon } from '@chakra-ui/react';
import BottomText from '../Bottom text/bottomText';
import SubmitButton from '../Buttons/submitButton';
import Greeting from '../Greetings texts/greeting';
import Logo from '../Logo/logo';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock, AiOutlineUser, AiOutlineMobile } from 'react-icons/ai';
import FormHelperText from '../Form helper text/formHelperText';
import { signUp } from '../../services/apis/authApi';

export type RegistrationFormData = {
	name: string;
	email: string;
	password: string;
	phone: string;
};

const RegisterForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<RegistrationFormData>();

	const onSubmit = async (values: RegistrationFormData) => {
		try {
			console.log(values);
			// const result = await signUp(values);
			// console.log(result);
			// console.log(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`);
		} catch (error) {
			console.error('Error message from user registration form:', error);
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
					left={'-1rem'}>
					<Logo />
				</Center>

				<>
					<Greeting text={'Simplify Shipping, Join Us Today!'} />
				</>
				<>
					<FormHelperText text={'Fill the form below to create an account '} />
				</>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						isRequired
						mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={AiOutlineUser} />
							</InputLeftElement>
							<Input
								id="name"
								placeholder="John Doe"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('name')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
					</FormControl>

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
								{...register('email')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={AiOutlineMobile} />
							</InputLeftElement>
							<Input
								id="phone"
								placeholder="Contact Number"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('phone')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
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
								{...register('password')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						mt={'1.5rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={AiOutlineLock} />
							</InputLeftElement>
							<Input
								id="confirmPassword"
								placeholder="Confirm Password"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('password')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
					</FormControl>

					<>
						<SubmitButton text={'Get Started'} />
					</>
				</form>
				<BottomText
					text={'Already'}
					link={'login'}
				/>
			</Box>
		</Flex>
	);
};

export default RegisterForm;