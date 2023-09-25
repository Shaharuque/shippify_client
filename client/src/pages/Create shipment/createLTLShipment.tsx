import { Flex, Center, Box } from '@chakra-ui/react';

import MultiStepperFormLTL from '../../components/LTL shipment/multiStepperFormLTL';
import ShipmentSteppers from '../../components/Steppers/shipmentSteppers';
import { useState } from 'react';

const CreateLTLShipmentPage = () => {
	const [activeStep, setActiveStep] = useState(1);

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};
	return (
		<Flex>
			<Box flex={0.8}>
				<Center>
					<MultiStepperFormLTL
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

export default CreateLTLShipmentPage;
