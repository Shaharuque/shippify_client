import { Flex, Box, Icon, Menu, IconButton, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiSolidHome } from 'react-icons/bi';
import { IoAnalyticsOutline, IoSettings } from 'react-icons/io5';

const Menus = () => {
	const boxStyles = {
		boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		backgroundColor: 'white',
	};

	return (
		<Flex
			as="nav"
			direction="row"
			gap={'1.5rem'}
			fontSize={'1.15rem'}
			fontWeight={'600'}
			p={'1rem'}>
			<Box
				p={'.5rem'}
				style={boxStyles}>
				<Link to={'/home'}>
					<Icon
						as={BiSolidHome}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</Link>
			</Box>
			<Box
				p={'.5rem'}
				style={boxStyles}>
				<Link to={'/dashboard'}>
					<Icon
						as={RxDashboard}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</Link>
			</Box>
			<Box
				p={'.5rem'}
				style={boxStyles}>
				<Link to={'/analytics'}>
					<Icon
						as={IoAnalyticsOutline}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</Link>
			</Box>
			<Menu>
				<MenuButton style={{ ...boxStyles }}>
					<Icon
						as={IoSettings}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</MenuButton>
				<MenuList>
					<MenuItem>Preferences</MenuItem>
					<MenuItem>Logout</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default Menus;
