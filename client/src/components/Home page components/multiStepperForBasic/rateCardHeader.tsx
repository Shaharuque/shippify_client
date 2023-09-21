import { Box, Flex } from '@chakra-ui/react';

const RateCardHeader = () => {
	return (
		<Flex
			bg={'primary'}
			gap={'1rem'}
			p={'.5rem'}>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Carrier
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Service Type
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Shipping amount
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Insurance amount
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Others amount
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Delivery days
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}
				m={'0 1rem'}>
				Carrier delivery days
			</Box>
			<Box
				padding={'.5rem'}
				fontWeight={'600'}>
				Trackable
			</Box>
		</Flex>
	);
};

export default RateCardHeader;
