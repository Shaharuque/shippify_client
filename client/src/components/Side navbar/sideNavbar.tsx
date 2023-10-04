import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SideBarMenus from './Side bar menus/sideBarMenus';
import Logo from '../Logo/logo';
import LogoutButton from './logoutButton';

const SideNavbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Box
			w={isExpanded ? '14vw' : '5vw'}
			h={'100vh'}
			bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}
			color="white"
			transition="width 0.3s"
			overflow="hidden"
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
			zIndex={100}
			pos={'absolute'}
			boxShadow={' 0px 19px 38px 0px rgba(0,0,0,0.3),0px 15px 12px 0px rgba(0,0,0,0.22)'}
			borderRadius={'.5rem'}>
			<Flex
				direction={'column'}
				align={'center'}
				h={'inherit'}
				justify={'space-between'}
				p={'1px 0 40px 0'}>
				<Flex
					direction={'column'}
					align={'center'}>
					<Logo
						primaryColor="#0E1420"
						isExpanded={isExpanded}
					/>
					<SideBarMenus isExpanded={isExpanded} />
				</Flex>

				<LogoutButton isExpanded={isExpanded} />
			</Flex>
		</Box>
	);
};

export default SideNavbar;
