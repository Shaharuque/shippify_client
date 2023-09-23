import { Box, Center, Flex } from '@chakra-ui/react';
import MultiStepperForBasic from '../../components/Home page components/multiStepperForBasic/multiStepperForBasic';
import ShipmentSteppers from '../../components/Steppers/shipmentSteppers';
import { useState } from 'react';

const CreateBasicShipmentPage = () => {
	const [activeStep, setActiveStep] = useState(1);

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};
	return (
		<Flex>
			<Box flex={0.8}>
				<Center>
					<MultiStepperForBasic
						activeStep={activeStep}
						handleStepChange={handleStepChange}
					/>
				</Center>
			</Box>

			<Flex
				direction={'column'}
				flex={0.2}>
				<Box flex={0.5}>
					<ShipmentSteppers activeStep={activeStep} />
				</Box>
				<Box flex={0.5}>Info</Box>
			</Flex>
		</Flex>
	);
};

export default CreateBasicShipmentPage;