import { Box, Flex, Text, Image } from '@chakra-ui/react';
import parcel from './../../assets/parcel(bg removed).png';
import container from './../../assets/container (bg removed).png';

const HomePageSidebar = () => {
	return (
		<Flex
			p={'.25rem'}
			flex={0.2}
			minH={'87vh'}
			direction={'column'}
			align={'center'}
			gap={'2rem'}>
			<Box
				bg={'#d7d7d7'}
				_hover={{ backgroundColor: 'apple', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
				p={'1rem'}
				w={'11rem'}
				fontSize={'1.15rem'}
				fontWeight={'600'}
				borderRadius={'1rem'}
				textAlign={'center'}>
				<Image src={parcel} />
				<Text>Basic Shipment</Text>
			</Box>

			<Box
				bg={'#d7d7d7'}
				_hover={{ backgroundColor: 'apple', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
				p={'1rem'}
				w={'11rem'}
				fontSize={'1.15rem'}
				fontWeight={'600'}
				borderRadius={'1rem'}
				textAlign={'center'}>
				<Image src={container} />
				<Text>LTL Shipment</Text>
			</Box>
		</Flex>
	);
};

export default HomePageSidebar;
