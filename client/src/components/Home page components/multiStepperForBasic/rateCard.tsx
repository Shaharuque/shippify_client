import { Badge, Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import ups from '../../../assets/ups.svg';
import fedex from '../../../assets/fedex-express-6.svg';
import stamps from '../../../assets/stamps_com.png';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';
import { LuBadgeDollarSign } from 'react-icons/lu';
import checked from '../../../assets/checked.png';

const RateCard = ({ props, isSelected, onSelect }: { props: IRateDetail; isSelected: boolean; onSelect: (rateId: string) => void }) => {
	const handleClick = () => {
		onSelect(props.rate_id);
	};

	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			p={4}
			marginBottom={4}
			width="100%"
			bg="white"
			boxShadow="lg"
			pos={'relative'}
			onClick={handleClick}
			_hover={{ backgroundColor: '#e8edeb' }}>
			{isSelected && (
				<Image
					src={checked}
					color="green.500"
					position="absolute"
					top={2}
					left={2}
					boxSize={6}
				/>
			)}
			<Flex
				justify="space-between"
				gap={'2rem'}>
				<Flex
					direction="column"
					alignItems="flex-start">
					<Flex gap={'1rem'}>
						<Image
							src={props.carrier_code === 'ups' ? ups : props.carrier_code === 'fedex' ? fedex : stamps}
							boxSize="5rem"
						/>
						<Flex direction={'column'}>
							<Text
								fontSize="lg"
								fontWeight="bold"
								mt={2}>
								{props.carrier_friendly_name}
							</Text>
							<Text
								fontSize=".65rem"
								color="gray.500">
								{props.service_type}
							</Text>
						</Flex>
					</Flex>
					{props.trackable && (
						<Badge
							colorScheme="green"
							borderRadius=".5rem"
							mt={2}>
							Trackable
						</Badge>
					)}
				</Flex>
				<Flex
					direction="column"
					alignItems="flex-end">
					<Flex
						gap={'.5rem'}
						alignItems={'center'}>
						<Icon
							as={LuBadgeDollarSign}
							color={'green.500'}
							boxSize={'1.5rem'}
						/>

						<Text
							fontSize="lg"
							fontWeight="bold"
							textTransform={'uppercase'}>
							{props.shipping_amount?.amount} ({props.shipping_amount?.currency})
						</Text>
					</Flex>
					<Text
						fontSize=".9rem"
						color="gray.500"
						textTransform={'uppercase'}>
						{props.insurance_amount?.amount} (insurance)
					</Text>
					<Text
						fontSize=".9rem"
						color="gray.500"
						textTransform={'uppercase'}>
						{props.other_amount?.amount} (tax)
					</Text>
					<Text
						fontSize=".85rem"
						color="gray.500"
						textTransform={'capitalize'}
						mt={'.5rem'}>
						{props.carrier_delivery_days}
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default RateCard;
