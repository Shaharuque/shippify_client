import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SideBarMenus from './Side bar menus/sideBarMenus';
import Logo from '../Logo/logo';
import LogoutButton from './logoutButton';

const SideNavbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Box
			w={isExpanded ? '13vw' : '5vw'}
			h={'100vh'}
			bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}
			color="white"
			transition="width 0.3s"
			overflow="hidden"
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}>
			<VStack
				spacing={10}
				width="100%"
				align="center">
				<Logo
					primaryColor="#0E1420"
					isExpanded={isExpanded}
				/>
				<SideBarMenus isExpanded={isExpanded} />
				<LogoutButton isExpanded={isExpanded} />
			</VStack>
		</Box>
	);
};

export default SideNavbar;
