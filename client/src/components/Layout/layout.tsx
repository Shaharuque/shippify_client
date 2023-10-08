import { Box, Flex } from '@chakra-ui/react';
import SideNavbar from '../Side navbar/sideNavbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<Flex>
			<Box>
				<SideNavbar />
			</Box>
			<Box
				w={'100vw'}
				h={'100vh'}
				overflow={'scroll'}
				bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}>
				<Outlet />
			</Box>
		</Flex>
	);
};

export default Layout;
