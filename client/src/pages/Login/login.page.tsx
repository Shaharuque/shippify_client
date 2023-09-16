import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import shipImage from './../../assets/ship.jpg';
import { useForm } from 'react-hook-form';

export type LoginFormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	// const {
	// 	handleSubmit,
	// 	register,
	// 	formState: { errors },
	// } = useForm<LoginFormData>({ resolver: loginResolver });

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
				bgSize={'cover'}
				bgPosition={'center'}></Box>
		</Flex>
	);
};

export default LoginPage;
