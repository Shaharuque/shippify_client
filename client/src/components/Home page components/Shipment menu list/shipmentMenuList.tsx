import { Flex } from '@chakra-ui/react';
import CreateBasicShipment from '../Cards/createBasicShipment';
import CreateLTLShipment from '../Cards/createLTLShipment';

const ShipmentMenuList = () => {
	return (
		<Flex
			p={'.25rem'}
			flex={0.1}
			direction={'column'}
			align={'center'}
			gap={'2rem'}>
			<CreateBasicShipment />
			<CreateLTLShipment />
		</Flex>
	);
};

export default ShipmentMenuList;
