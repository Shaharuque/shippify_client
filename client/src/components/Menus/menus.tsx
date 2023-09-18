import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiSolidHome } from 'react-icons/bi';
import { IoAnalyticsOutline } from 'react-icons/io5';

const Menus = () => {
	return (
		<Flex
			as="nav"
			direction="row"
			gap={'1.5rem'}
			fontSize={'1.15rem'}
			fontWeight={'600'}
			p={'1rem'}>
			<Box p={'.5rem'}>
				<Link to={'/home'}>
					{/* <Text>Home</Text> */}{' '}
					<Icon
						as={BiSolidHome}
						boxSize={'1.5rem'}
					/>
				</Link>
			</Box>
			<Box p={'.5rem'}>
				<Link to={'/dashboard'}>
					{/* <Text>Dashboard</Text> */}{' '}
					<Icon
						as={RxDashboard}
						boxSize={'1.5rem'}
					/>
				</Link>
			</Box>
			<Box p={'.5rem'}>
				<Link to={'/analytics'}>
					{/* <Text>Analytics</Text> */}{' '}
					<Icon
						as={IoAnalyticsOutline}
						boxSize={'1.5rem'}
					/>
				</Link>
			</Box>
		</Flex>
	);
};

export default Menus;
