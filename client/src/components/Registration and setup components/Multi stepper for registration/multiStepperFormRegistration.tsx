import { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import RegisterForm from '../Register form/registerForm';
import CompanyProfileForm from '../Company profile form/companyProfileForm';
import AddressSetupForm from '../Address setup form/addressSetupForm';
import OtpForm from '../Otp form/otpForm';
import OnboardingSteppers from '../../Steppers/onboardingSteppers';
import WarehouseSetupForm from '../Warehouse setup form/warehouseSetupForm';

export default function MultistepRegistration() {
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

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
					) : step === 4 ? (
						<AddressSetupForm
							prevStep={prevStep}
							nextStep={nextStep}
						/>
					) : step === 5 ? (
						<WarehouseSetupForm prevStep={prevStep} />
					) : null}
					<Box m={'2rem 0'}>
						<OnboardingSteppers activeStep={step} />
					</Box>
				</Box>
			</Flex>
		</>
	);
}
