import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Logo/logo';
import Menus from '../Menus/menus';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}>
			<Flex
				bg={'transparent'}
				h={'10vh'}
				position="sticky"
				top="0"
				zIndex="100"
				justify={'space-between'}
				align={'center'}
				p={'.25rem'}>
				<Logo />
				<>
					<Menus />
				</>
			</Flex>
			<Box
				p={'1rem'}
				h={'90vh'}>
				<Outlet></Outlet>
			</Box>
		</Box>
	);
};

export default Navbar;
