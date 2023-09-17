import { useForm } from 'react-hook-form';
import { Center, Flex, Box, FormControl, Input, InputGroup, InputLeftElement, FormErrorMessage, Icon, HStack } from '@chakra-ui/react';
import BottomText from '../Bottom text/bottomText';
import SubmitButton from '../Buttons/submitButton';
import Greeting from '../Greetings texts/greeting';
import Logo from '../Logo/logo';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock, AiOutlineUser, AiOutlineMobile } from 'react-icons/ai';
import FormHelperText from '../Form helper text/formHelperText';
import { signUp } from '../../services/apis/authApi';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useState } from 'react';
import { axiosInstance } from '../../services/axios';

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
	const [otpStatus, setOtpStatus] = useState<boolean>(false);

	const onSubmit = async (values: RegistrationFormData) => {
		try {
			// console.log(values);
			const result = await signUp(values);
			console.log(result);
		} catch (error) {
			console.error('Error message from user registration form:', error);
		}
	};

	const deadline = Date.now() + 1000 * 2 * 60; // Dayjs is also OK

	const onFinish = () => {
		console.log('finished!');
		setOtpStatus(false);
	};

	const requestForOtp = async (values: any) => {
		let isbussiness = true;
		if (values.user_type == 'supplier') {
			isbussiness = false;
		}
		values.isbussiness = isbussiness;
		localStorage.setItem('regTempData', JSON.stringify(values));

		try {
			const res = await axiosInstance.post('/register/request', values);
			console.log(res);
			setOtpStatus(true);

			// navigator("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const resetDataForOTP = async () => {
		let tempUserData = localStorage.getItem('regTempData');
		tempUserData = JSON.parse(tempUserData as string);

		try {
			const res = await axiosInstance.post('/register/request', tempUserData);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const submitOtp = async (values: any) => {
		try {
			const res = await axiosInstance.post('/register/confirm', values);
			console.log(res);
			localStorage.removeItem('regTempData');
			// navigator('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{otpStatus ? (
				<HStack>
					<PinInput
						type="alphanumeric"
						mask>
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
					</PinInput>
				</HStack>
			) : (
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
			)}
		</>
	);
};

export default RegisterForm;
