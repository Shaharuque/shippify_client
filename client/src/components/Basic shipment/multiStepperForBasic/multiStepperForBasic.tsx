import SenderAddressForm from './senderAddressForm';
import ReceiverAddressForm from './recieverAddressForm';
import PackageDetailsForm from './packageDetailsForm';
import RateSelectionForm from './rateSelectionForm';
import InsuranceDetailsForm from './insuranceDetailsForm';
import PaymentForm from './paymentForm';

const MultiStepperForBasic = ({ activeStep, handleStepChange }: { activeStep: number; handleStepChange: (step: number) => void }) => {
	const nextStep = () => {
		handleStepChange(activeStep + 1);
	};
	const prevStep = () => {
		handleStepChange(activeStep - 1);
	};
	return (
		<>
			{activeStep === 1 ? (
				<SenderAddressForm nextStep={nextStep} />
			) : activeStep === 2 ? (
				<ReceiverAddressForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 3 ? (
				<PackageDetailsForm
					nextStep={nextStep}
					prevStep={prevStep}
				/>
			) : activeStep === 4 ? (
				<RateSelectionForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 5 ? (
				<InsuranceDetailsForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : activeStep === 6 ? (
				<PaymentForm
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			) : null}
		</>
	);
};

export default MultiStepperForBasic;
