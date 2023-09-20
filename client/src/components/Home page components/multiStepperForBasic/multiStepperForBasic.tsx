import { useState } from 'react';
import SenderAddressForm from './senderAddress';
import ReceiverAddressForm from './recieverAddressForm';

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
			) : null}
		</>
	);
};

export default MultiStepperForBasic;
