import { Box, Flex } from '@chakra-ui/react';

const steps = [1, 2, 3, 4, 5];

const OnboardingSteppers = ({ activeStep }: { activeStep: number }) => {
	return (
		<Flex
			gap={'1rem'}
			align={'center'}
			justify={'center'}>
			{steps.map((step: number) => (
				<Box
					bg={step === activeStep ? 'cta' : '#E3F4ED'}
					w={'5rem'}
					h={'.55rem'}
					borderRadius={'2rem'}
				/>
			))}
		</Flex>
	);
};

export default OnboardingSteppers;
