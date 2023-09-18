import { Flex, PinInput, HStack, PinInputField, Button, VStack, Box } from '@chakra-ui/react';
import FormHelperText from '../../Form helper text/formHelperText';
import Logo from '../../Logo/logo';
import { FormEvent, useState } from 'react';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import CountdownTimer from '../../Countdown timer/countDownTimer';
import { sendOTP, signUp } from '../../../services/apis/authApi';

export type OtpFormData = {
	code: string;
};
const OtpForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [pin, setPin] = useState('');
	const [reset, setReset] = useState(59);

	const handlePinSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const result = await sendOTP({ code: pin });
			console.log('OTP form:', result);
			if (result?.data?.status === 'success') {
				localStorage.setItem('token', result?.data?.token);
				nextStep();
			} else setReset(59);
		} catch (error) {
			console.error(error);
		}
	};

	const handleResetTimer = async () => {
		const userTempData = localStorage.getItem('userTempData');
		if (userTempData) {
			const user = JSON.parse(userTempData);
			console.log('User from localstorage after resending OTP:', user);
			const result = await signUp(user);
			console.log('Resend OTP', result);
			if (result?.data?.status === 'success') {
				localStorage.removeItem('userTempData');
				setReset(59);
			}
		}
	};

	const handleTimeRunout = () => {
		prevStep();
	};

	const handleBackButton = () => {
		prevStep();
	};

	return (
		<VStack>
			<Box
				pos={'relative'}
				top={'-6rem'}
				left={'-.75rem'}>
				<Logo />
			</Box>
			<Box
				pos={'relative'}
				top={'-4rem'}>
				<CountdownTimer
					duration={reset}
					runOutFunction={handleTimeRunout}
				/>
			</Box>
			<Box mb={'1.5rem'}>
				<Button onClick={handleResetTimer}>Resend OTP</Button>
			</Box>

			<>
				<FormHelperText text={'Check the email you provided for OTP'} />
			</>

			<form
				onSubmit={handlePinSubmit}
				style={{ marginTop: '2.5rem' }}>
				<HStack
					justify={'center'}
					gap={'1.5rem'}
					mb={'2rem'}>
					<PinInput
						otp
						type="alphanumeric"
						onChange={(value) => setPin(value)}
						value={pin}>
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
					</PinInput>
				</HStack>
				<Flex
					gap={'1rem'}
					mt={'3rem'}>
					<BackButton onClick={handleBackButton} />

					<>
						<SubmitButton text={'Verify'} />
					</>
				</Flex>
			</form>
		</VStack>
	);
};

export default OtpForm;
