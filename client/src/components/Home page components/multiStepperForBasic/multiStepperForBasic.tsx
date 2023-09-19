import { useState } from 'react';

const MultiStepperForBasic = () => {
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};
	return <div>multiStepperForBasic</div>;
};

export default MultiStepperForBasic;
