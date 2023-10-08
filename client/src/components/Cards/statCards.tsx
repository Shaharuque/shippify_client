import { Flex, Text, Icon, Circle } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import formatMonetaryValue from '../../utils/addCommatoMonetaryValues';

type StatCardsProps = {
	title: string;
	value: number;
	icon: IconType;
	color: string;
};
const StatCards = ({ title, value, icon, color }: StatCardsProps) => {
	return (
		<Flex
			direction={'column'}
			// w={'16rem'}
			bg={'#f1f1f1'}
			_hover={{ backgroundColor: '#e8edeb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			borderRadius={'1rem'}
			marginBottom={"20px"}>
			<Flex justify={'space-between'}>
				<Text
					as="b"
					fontSize={'1rem'}
					fontWeight={'600'}>
					{title}
				</Text>
				<Circle
					border={'.5px solid grey'}
					p={'.5rem'}>
					<Icon
						as={icon}
						boxSize={'1.5rem'}
						color={color}
					/>
				</Circle>
			</Flex>
			<Text
				as="b"
				fontSize={'1rem'}
				fontWeight={'600'}>
				{formatMonetaryValue(value)}
			</Text>
		</Flex>
	);
};

export default StatCards;
