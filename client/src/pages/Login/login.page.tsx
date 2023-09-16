import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import shipImage from './../../assets/ship.jpg';

const LoginPage = () => {
	return (
		<Flex h={'100vh'}>
			<Box flex={0.5}>
				<form>
					<FormControl>
						<FormLabel>Email</FormLabel>
					</FormControl>
				</form>
			</Box>
			<Box
				flex={0.5}
				bgImage={shipImage}
				boxSize={'10rem'}></Box>
		</Flex>
	);
};

export default LoginPage;
