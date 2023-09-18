import { Flex, Center, PinInput, HStack, PinInputField } from '@chakra-ui/react';
import FormHelperText from '../Form helper text/formHelperText';
import Logo from '../Logo/logo';
import Greeting from '../Greetings texts/greeting';
import { useState } from 'react';
import SubmitButton from '../Buttons/submitButton';
import BackButton from '../Buttons/backButton';

const OtpForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [pin, setPin] = useState('');

	const handlePinSubmit = () => {
		console.log('Pin:', pin);
		nextStep();
	};

	const handleBackButton = () => {
		prevStep();
	};

	return (
		<>
			<Center
				pos={'relative'}
				top={'-4rem'}
				left={'-.75rem'}>
				<Logo />
			</Center>

			<>
				<Greeting text={'You are almost there!'} />
			</>

			<>
				<FormHelperText text={'Check the email you provided for OTP'} />
			</>

			<form
				onSubmit={handlePinSubmit}
				style={{ marginTop: '3rem' }}>
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
