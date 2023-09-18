import { Flex, Center, PinInput, HStack, PinInputField, Box, Button } from '@chakra-ui/react';
import FormHelperText from '../Form helper text/formHelperText';
import Logo from '../Logo/logo';
import Greeting from '../Greetings texts/greeting';
import { useState } from 'react';
import SubmitButton from '../Buttons/submitButton';
import BackButton from '../Buttons/backButton';
import CountdownTimer from '../Countdown timer/countDown';

const OtpForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [pin, setPin] = useState('');

	const handlePinSubmit = () => {
		console.log('Pin:', pin);
		nextStep();
	};

	const handleResetTimer = () => {};

	const handleTimeRunout = () => {};

	const handleBackButton = () => {
		prevStep();
	};

	return (
		<>
			<Center
				pos={'relative'}
				top={'-6rem'}
				left={'-.75rem'}>
				<Logo />
			</Center>
			<Center
				pos={'relative'}
				top={'-4rem'}>
				<CountdownTimer />
			</Center>
			<Center mb={'1.5rem'}>
				<Button>Resend OTP</Button>
			</Center>

			<Center>
				<FormHelperText text={'Check the email you provided for OTP'} />
			</Center>

			<form
				onSubmit={handlePinSubmit}
				style={{ marginTop: '2.5rem' }}>
				<HStack
					justify={'center'}
					gap={'2rem'}
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
					</PinInput>
				</HStack>
				<Flex
					gap={'1rem'}
					mt={'3rem'}>
					<BackButton onClick={handleBackButton} />
					<SubmitButton text={'Verify'} />
				</Flex>
			</form>
		</>
	);
};

export default OtpForm;
