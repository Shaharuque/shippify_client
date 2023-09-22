import { Badge, Flex, Image, Text } from '@chakra-ui/react';
import ups from '../../../assets/ups.svg';
import fedex from '../../../assets/fedex-express-6.svg';
import stamps from '../../../assets/stamps_com.png';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';

const RateCard = (props: any) => {
	return (
		<Flex justify={'space-between'}>
			<Flex direction={'column'}>
				<Flex gap={'1rem'}>
					<Image
						src={props.carrier_name === 'ups' ? ups : props.carrier_name === 'fedex' ? fedex : stamps}
						boxSize={'5rem'}
					/>
					<Flex direction={'column'}>
						<Text>{props.carrier_friendly_name}</Text>
						<Text>{props.service_type}</Text>
					</Flex>
				</Flex>
				{props.trackable ? (
					<Badge
						colorScheme="green"
						borderRadius={'.5rem'}>
						Trackable
					</Badge>
				) : null}
			</Flex>
			<Flex direction={'column'}>
				<Text>
					{props.shipping_amount?.amount} ({props.shipping_amount?.currency})
				</Text>
				<Text>
					{props.insurance_amount?.amount} ({props.insurance_amount?.currency})
				</Text>
				<Text>
					{props.other_amount?.amount} ({props.other_amount?.currency})
				</Text>
			</Flex>
		</Flex>
	);
};

export default RateCard;
