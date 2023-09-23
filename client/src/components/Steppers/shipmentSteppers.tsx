import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react';

const ShipmentSteppers = ({ activeStep }: { activeStep: number }) => {
	const steps = [{ title: "Sender's address" }, { title: "Reciever's address" }, { title: 'Package Details' }, { title: 'Rate Selection' }, { title: 'Insurance Details' }, { title: 'Payment' }, { title: 'Label Creation' }];

	return (
		<Stepper
			index={activeStep}
			orientation="vertical"
			height="400px"
			gap="0"
			colorScheme="teal">
			{steps.map((step, index) => (
				<Step key={index}>
					<StepIndicator>
						<StepStatus
							complete={<StepIcon />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>

					<Box flexShrink="0">
						<StepTitle>{step.title}</StepTitle>
						{/* <StepDescription>{step.description}</StepDescription> */}
					</Box>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
};

export default ShipmentSteppers;
