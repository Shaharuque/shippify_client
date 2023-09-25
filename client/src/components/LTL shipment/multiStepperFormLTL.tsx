import PackageDetailsFormLTL from './packageDetailsFormLTL';
import RecieverAddressFormLTL from './recieverAddressFormLTL';
import SenderAddressFormLTL from './senderAddressFormLTL';

const MultiStepperFormLTL = ({ activeStep, handleStepChange }: { activeStep: number; handleStepChange: (step: number) => void }) => {
	const nextStep = () => {
		handleStepChange(activeStep + 1);
	};

	const prevStep = () => {
		handleStepChange(activeStep - 1);
	};
	return (
		<>
			{activeStep === 1 ? (
				<SenderAddressFormLTL nextStep={nextStep} />
			) : activeStep === 2 ? (
				<RecieverAddressFormLTL
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 3 ? (
				<PackageDetailsFormLTL />
			) : null}
		</>
	);
};

export default MultiStepperFormLTL;
