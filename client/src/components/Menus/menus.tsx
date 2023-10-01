import { Flex, Box, Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiSolidHome } from 'react-icons/bi';
import { IoAnalyticsOutline, IoSettings } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';

const Menus = () => {
	const boxStyles = {
		boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '0.5rem',
		padding: '0.5rem',
		backgroundColor: 'white',
		transition: 'transform 0.3s ease',
		transform: 'scale(1)',
	};

	const handleLinkHover = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.transform = 'scale(1.1)';
	};

	const handleLinkLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.transform = 'scale(1)';
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
				style={boxStyles}
				onMouseOver={handleLinkHover}
				onMouseLeave={handleLinkLeave}>
				<Link to={'/home'}>
					<Icon
						as={BiSolidHome}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</Link>
			</Box>
			<Box
				p={'.25rem'}
				style={boxStyles}
				onMouseOver={handleLinkHover}
				onMouseLeave={handleLinkLeave}>
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
				style={boxStyles}
				onMouseOver={handleLinkHover}
				onMouseLeave={handleLinkLeave}>
				<Link to={'/payment'}>
					<Icon
						as={MdOutlinePayment}
						boxSize={'1.5rem'}
						color={'#28231D'}
					/>
				</Link>
			</Box>
			<Menu>
				<Box
					style={{ ...boxStyles }}
					onMouseOver={handleLinkHover}
					onMouseLeave={handleLinkLeave}>
					<MenuButton>
						<Icon
							as={IoSettings}
							boxSize={'1.5rem'}
							color={'#28231D'}
						/>
					</MenuButton>
				</Box>
				<MenuList>
					<MenuItem justifyContent={'space-between'}>
						Logout
						<Icon
							as={TbLogout2}
							boxSize={'1.5rem'}
							color={'#28231D'}
						/>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default Menus;
