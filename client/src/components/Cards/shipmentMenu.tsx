import { Text, Flex, Center, Box, Icon, Tooltip } from '@chakra-ui/react';
import { BiInfoCircle } from 'react-icons/bi';
import { ReactElement } from 'react';

type ShipmentMenuProps = {
	title: string;
	lottie: ReactElement;
};

const ShipmentMenu = ({ title, lottie }: ShipmentMenuProps) => {
	return (
		<Flex
			bg={'#f1f1f1 '}
			_hover={{ backgroundColor: '#e8edeb ', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			borderRadius={'1rem'}
			w={'15rem'}
			gap={'2rem'}
			direction={'column'}
			pos={'relative'}>
			<Tooltip label="Hello">
				<Box
					pos={'absolute'}
					right={'3'}
					top={'2'}>
					<Icon as={BiInfoCircle} />
				</Box>
			</Tooltip>

			<Center>
				<Box boxSize={'5rem'}>{lottie}</Box>
			</Center>

			<Center>
				<Text
					as="b"
					fontSize={'1.15rem'}
					fontWeight={'600'}>
					{title}
				</Text>
			</Center>
		</Flex>
	);
};

export default ShipmentMenu;
