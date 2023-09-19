import { Flex } from '@chakra-ui/react';
import StatCards from '../Home page components/Cards/statCards';
import { RiShipLine } from 'react-icons/ri';
import { TbPackageOff } from 'react-icons/tb';
import { LuBadgeDollarSign } from 'react-icons/lu';

const StatCardList = () => {
	return (
		<Flex
			p={'.25rem'}
			flex={0.1}
			direction={'column'}
			align={'center'}
			gap={'2rem'}>
			<StatCards
				title={'Total Shipment'}
				value={18}
				icon={RiShipLine}
				color={'secondary'}
			/>
			<StatCards
				title={'Returned goods'}
				value={6}
				icon={TbPackageOff}
				color={'red.500'}
			/>
			<StatCards
				title={'Total Spent'}
				value={18000}
				icon={LuBadgeDollarSign}
				color={'green.500'}
			/>
		</Flex>
	);
};

export default StatCardList;
