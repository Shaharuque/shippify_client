import { useState } from 'react';
import { Progress, Flex, Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import RegisterForm from '../Register form/registerForm';
import CompanyProfileForm from '../Company profile form/companyProfileForm';
import AddressSetupForm from '../Address setup form/addressSetupForm';
import OtpForm from '../Otp form/otpForm';

export default function Multistep() {
	const toast = useToast();
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(25);

	const nextStep = () => {
		setStep(step + 1);
		if (step === 4) {
			setProgress(100);
		} else {
			setProgress(progress + 25);
		}
	};

	const prevStep = () => {
		setStep(step - 1);
		setProgress(progress - 25);
	};

	// const handleSubmit = () => {
	// 	toast({
	// 		title: 'Account created.',
	// 		description: "We've created your account for you.",
	// 		status: 'success',
	// 		duration: 3000,
	// 		isClosable: true,
	// 	});
	// };

	return (
		<>
			<Flex
				flex={0.5}
				direction={'column'}
				justify={'center'}>
				<Box
					p={'1rem'}
					m={'0 auto'}
					w={'25rem'}>
					<Progress
						hasStripe
						value={progress}
						mb="5%"
						mx="5%"
						isAnimated
					/>
					{step === 1 ? (
						<RegisterForm nextStep={nextStep} />
					) : step === 2 ? (
						<OtpForm
							nextStep={nextStep}
							prevStep={prevStep}
						/>
					) : step === 3 ? (
						<CompanyProfileForm
							nextStep={nextStep}
							prevStep={prevStep}
						/>
					) : (
						<AddressSetupForm prevStep={prevStep} />
					)}
				</Box>
			</Flex>
		</>
	);
}
