import { Box, Center, Flex } from '@chakra-ui/react';
import MultiStepperForBasic from '../../components/Home page components/multiStepperForBasic/multiStepperForBasic';

const CreateBasicShipmentPage = () => {
	return (
		<Flex>
			<Box flex={0.7}>
				<Center>
					<MultiStepperForBasic />
				</Center>
			</Box>

			<Flex
				direction={'column'}
				flex={0.3}>
				<Box flex={0.5}>Stepper</Box>
				<Box flex={0.5}>Info</Box>
			</Flex>
		</Flex>
	);
};

export default CreateBasicShipmentPage;
