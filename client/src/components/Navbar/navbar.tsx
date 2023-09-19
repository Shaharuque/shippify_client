import { Box, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Logo from '../Logo/logo';
import Menus from '../Menus/menus';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(window.scrollY);
			} else {
				setIsScrolled(0);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<Flex
				bg={isScrolled > 0 ? 'lightTeal' : 'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}
				minHeight={'3rem'}
				position="sticky"
				top="0"
				zIndex="999"
				boxShadow={isScrolled > 0 ? 'rgba(0, 0, 0, 0.15) 0 .325rem .325rem' : 'none'}
				transition="background 0.3s, box-shadow 0.3s"
				justify={'space-between'}
				align={'center'}
				p={'.25rem'}>
				<Logo
					boxSize={'5rem'}
					fontSize={'1.125rem'}
				/>
				<Menus />
			</Flex>
			<Box
				p={'1rem'}
				bg={'#e6e6e6'}
				minH={'91vh'}>
				<Outlet></Outlet>
			</Box>
		</>
	);
};

export default Navbar;
