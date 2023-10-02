import { Flex, Center, Box } from '@chakra-ui/react';
import MultiStepperFormLTL from '../../components/LTL shipment/Multi stepper for LTL/multiStepperFormLTL';
import ShipmentSteppers from '../../components/Steppers/shipmentSteppers';
import { useState } from 'react';

const stepsForLTL = [{ title: "Sender's address" }, { title: "Reciever's address" }, { title: 'Package Details' }, { title: 'Service and Billing info' }, { title: 'Insurance Details' }, { title: 'Payment' }, { title: 'Bill of lading' }];

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
					<ShipmentSteppers
						activeStep={activeStep - 1}
						steps={stepsForLTL}
					/>
				</Box>
				<Box flex={0.5}></Box>
			</Flex>
		</Flex>
	);
};

export default CreateLTLShipmentPage;
