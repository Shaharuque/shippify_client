import { Flex } from '@chakra-ui/react';
import HomePageLeftSidebar from '../../components/Home page components/Home page sidebar/homePageLeftSidebar';
import HomePageRightSidebar from '../../components/Home page components/Home page sidebar/homePageRightSidebar';

const HomePage = () => {
	return (
		<Flex gap={'1rem'}>
			<HomePageLeftSidebar />
			<HomePageRightSidebar />
		</Flex>
	);
};

export default HomePage;
