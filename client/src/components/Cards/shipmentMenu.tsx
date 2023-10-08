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
			bg={'white '}
			_hover={{ backgroundColor: '#e8edeb ', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}
			p={'1rem'}
			borderRadius={'1rem'}
			// w={'15rem'}
			gap={'.75rem'}
			direction={'column'}
			pos={'relative'}
			marginBottom={'10px'}
			justify={'center'}
			>
			<Tooltip label="Hello">
				<Box
					pos={'absolute'}
					right={'3'}
					top={'2'}>
					<Icon as={BiInfoCircle} />
				</Box>
			</Tooltip>

			<Center>
				<Box boxSize={'3rem'}>{lottie}</Box>
			</Center>

			<Center>
				<Text
					as="b"
					fontSize={'0.75rem'}
					fontWeight={'600'}>
					{title}
				</Text>
			</Center>
		</Flex>
	// 	<>
	// 	<div>
	// 		<div className='h-[120px]'>
	// 			{lottie}
	// 		</div>
	// 	</div>
	// </>
	);
};

export default ShipmentMenu;
