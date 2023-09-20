import { useState } from 'react';
import SenderAddressForm from './senderAddress';
import ReceiverAddressForm from './recieverAddressForm';
import PackageDetailsForm from './packageDetailsForm';

const MultiStepperForBasic = () => {
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};
	return (
		<>
			{step === 1 ? (
				<SenderAddressForm nextStep={nextStep} />
			) : step === 2 ? (
				<ReceiverAddressForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : step === 3 ? (
				<PackageDetailsForm />
			) : null}
		</>
	);
};

export default MultiStepperForBasic;
