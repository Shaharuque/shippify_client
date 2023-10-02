import { Box, Center, Flex } from '@chakra-ui/react';
import MultiStepperForBasic from '../../components/Basic shipment/multiStepperForBasic/multiStepperForBasic';
import ShipmentSteppers from '../../components/Steppers/shipmentSteppers';
import { useState } from 'react';

const stepsForBasic = [{ title: "Sender's address" }, { title: "Reciever's address" }, { title: 'Package Details' }, { title: 'Rate Selection' }, { title: 'Insurance Details' }, { title: 'Payment' }, { title: 'Label Creation' }];

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
					<ShipmentSteppers
						activeStep={activeStep - 1}
						steps={stepsForBasic}
					/>
				</Box>
				<Box flex={0.5}></Box>
			</Flex>
		</Flex>
	);
};

export default CreateBasicShipmentPage;
