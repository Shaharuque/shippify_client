import { Flex } from '@chakra-ui/react';
import RegisterForm from '../../components/Register form/registerForm';
import BackgroundImage from '../../components/Background image/backgroundImage';

const RegisterPage = () => {
	return (
		<Flex h={'100vh'}>
			<RegisterForm />
			<BackgroundImage />
		</Flex>
	);
};

export default RegisterPage;
