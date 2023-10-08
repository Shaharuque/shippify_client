import { Flex, Text, Icon, Circle } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import formatMonetaryValue from '../../utils/addCommatoMonetaryValues';

type StatCardsProps = {
	title: string;
	value: number;
	icon: IconType;
	color: string;
	sign?: string;
	bg?: string;
};
const StatCards = ({ title, value, icon, color,sign,bg }: StatCardsProps) => {
	return (
		<Flex
			direction={'column'}
			// w={'16rem'}
			_hover={{ backgroundColor: '#e8edeb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)', color:'black' }}
			p={'.75rem'}
			borderRadius={'1rem'}
			marginBottom={"20px"}
			backgroundColor={bg}
			color={'white'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text
					as="b"
					fontSize={'.75rem'}
					fontWeight={'600'}>
					{title}
				</Text>
				<Circle
					p={'.2rem'}
					margin={'0 1rem'}>
					<Icon
						as={icon}
						boxSize={'1rem'}
						
					/>
				</Circle>
			</Flex>
			<Text
				as="b"
				fontSize={'1rem'}
				fontWeight={'600'}>
				{sign ? value + sign : value}
			</Text>
		</Flex>
	);
};

export default StatCards;
