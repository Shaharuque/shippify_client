import { Badge, Box, Flex, Icon, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import ups from '../../assets/ups.svg';
import { LuBadgeDollarSign } from 'react-icons/lu';

const ShipmentCard = () => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			p={useBreakpointValue({ base: 2, md: 4, lg: 6 })}
			marginBottom={4}
			bg="white"
			boxShadow="lg"
			_hover={{ backgroundColor: '#e8edeb' }}>
			<Flex
				gap={'1vw'}
				align={'center'}
				whiteSpace={'nowrap'}>
				<Stack align={'center'}>
					<Image
						src={ups}
						boxSize={'2.5rem'}
					/>

					<Text
						fontWeight={'md'}
						fontSize={'sm'}>
						UPS Next Day Air®
					</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Shipping cost</Text>
					<Stack
						direction={'row'}
						align={'center'}>
						<Icon
							as={LuBadgeDollarSign}
							color={'green.500'}
							boxSize={'1.25rem'}
						/>
						<Text>490.35</Text>
					</Stack>
				</Stack>
				<Stack align={'center'}>
					<Text
						fontSize={'md'}
						fontWeight={'bold'}>
						Total packages
					</Text>
					<Text fontSize={'sm'}>5 Packages</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Tracking Id</Text>
					<Text fontSize={'sm'}>2212BxC</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Source</Text>
					<Text fontSize={'sm'}>CA, USA</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Destination</Text>
					<Text fontSize={'sm'}>ON, CANADA</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Estimated Delivery Date</Text>
					<Text fontSize={'sm'}>Fri, 26th Sep, 2023</Text>
				</Stack>
				<Stack align={'center'}>
					<Text fontWeight={'bold'}>Delivery status</Text>
					<Badge
						colorScheme="pink"
						borderRadius={'md'}
						fontSize={'sm'}>
						Delivered
					</Badge>
				</Stack>
			</Flex>
		</Box>
	);
};

export default ShipmentCard;
