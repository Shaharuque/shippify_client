import { useForm } from 'react-hook-form';
import { Center, Box, FormControl, Input, InputGroup, InputLeftElement, FormErrorMessage, Icon } from '@chakra-ui/react';
import BottomText from '../../Bottom text/bottomText';
import SubmitButton from '../../Buttons/submitButton';
import Greeting from '../../Greetings texts/greeting';
import Logo from '../../Logo/logo';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock, AiOutlineUser, AiOutlineMobile } from 'react-icons/ai';
import FormHelperText from '../../Form helper text/formHelperText';
import { signUp } from '../../../services/apis/authApi';

export type RegistrationFormData = {
	name: string;
	email: string;
	password: string;
	phone: string;
};

const RegisterForm = ({ nextStep }: { nextStep: () => void }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<RegistrationFormData>();

	const onSubmit = async (values: RegistrationFormData) => {
		try {
			const result = await signUp(values);
			if (result?.data?.status === 'success') {
				localStorage.setItem('userData', JSON.stringify(values));

				nextStep();
			}
		} catch (error) {
			console.error('Error message from user registration form:', error);
		}
	};

	return (
		<>
			<Center>
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
							_placeholder={{ color: '#808080' }}
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
							_placeholder={{ color: '#808080' }}
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
							_placeholder={{ color: '#808080' }}
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
							type="password"
							placeholder="Password"
							_placeholder={{ color: '#808080' }}
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
							type="password"
							placeholder="Confirm Password"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('password')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
				</FormControl>

				<Box mt={'2rem'}>
					<SubmitButton text={'Get OTP'} />
				</Box>
			</form>
			<BottomText
				text={'Already'}
				link={'login'}
			/>
		</>
	);
};

export default RegisterForm;
