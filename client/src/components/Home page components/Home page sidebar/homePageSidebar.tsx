import { Flex } from '@chakra-ui/react';

import CreateBasicShipment from './../Cards/createBasicShipment';
import CreateLTLShipment from './../Cards/createLTLShipment';

const HomePageSidebar = () => {
	return (
		<Flex
			p={'.25rem'}
			flex={0.2}
			minH={'87vh'}
			direction={'column'}
			align={'center'}
			gap={'2rem'}>
			<CreateBasicShipment />
			<CreateLTLShipment />
		</Flex>
	);
};

export default HomePageSidebar;
