import { Box, Flex } from '@chakra-ui/react';

type OnboardingSteppersProps = {
	step: number;
};

const OnboardingSteppers = ({ step }: OnboardingSteppersProps) => {
	return (
		<Flex
			gap={'1rem'}
			align={'center'}
			justify={'center'}>
			<Box
				bg={step === 1 ? 'cta' : '#E3F4ED'}
				w={'5rem'}
				h={'.55rem'}
				borderRadius={'2rem'}></Box>
			<Box
				bg={step === 2 ? 'cta' : '#E3F4ED'}
				w={'5rem'}
				h={'.55rem'}
				borderRadius={'2rem'}></Box>
			<Box
				bg={step === 3 ? 'cta' : '#E3F4ED'}
				w={'5rem'}
				h={'.55rem'}
				borderRadius={'2rem'}></Box>
			<Box
				bg={step === 4 ? 'cta' : '#E3F4ED'}
				w={'5rem'}
				h={'.55rem'}
				borderRadius={'2rem'}></Box>
		</Flex>
	);
};

export default OnboardingSteppers;
