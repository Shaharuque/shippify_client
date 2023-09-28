import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Logo/logo';
import Menus from '../Menus/menus';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box
			bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}
			h={'100vh'}>
			<Flex
				bg={'transparent'}
				position="sticky"
				top="0"
				zIndex="100"
				justify={'space-between'}
				align={'center'}
				p={'.25rem'}>
				<Box ml={'1rem'}>
					<Logo />
				</Box>
				<>
					<Menus />
				</>
			</Flex>
			<Box p={'1rem'}>
				<Outlet></Outlet>
			</Box>
		</Box>
	);
};

export default Navbar;
