import PackageDetailsFormLTL from './packageDetailsFormLTL';
import QuoteDetails from './quoteDetails';
import RecieverAddressFormLTL from './recieverAddressFormLTL';
import SenderAddressFormLTL from './senderAddressFormLTL';
import ServicesAndBillingDetailsForm from './servicesAndBillingDetailsForm';

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
				<PackageDetailsFormLTL
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 4 ? (
				<ServicesAndBillingDetailsForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 5 ? (
				<QuoteDetails
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : null}
		</>
	);
};

export default MultiStepperFormLTL;
