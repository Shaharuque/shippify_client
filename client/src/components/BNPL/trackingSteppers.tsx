import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react';

const TrackingSteppers = ({ activeStep, steps }: { activeStep: number; steps: { title: string }[] }) => {
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
					</Box>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
};

export default TrackingSteppers;
