import { Flex } from '@chakra-ui/react';
import CreateBasicShipment from '../../components/Basic shipment/Cards/createBasicShipment';
import CreateLTLShipment from '../../components/Basic shipment/Cards/createLTLShipment';

const HomePage = () => {
	return (
		<Flex
			justify={'space-evenly'}
			gap={'4rem'}
			align={'center'}>
			<CreateBasicShipment />
			<CreateLTLShipment />
		</Flex>
	);
};

export default HomePage;
