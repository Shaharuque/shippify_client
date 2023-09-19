import { Flex } from '@chakra-ui/react';
import BackgroundImage from '../../components/Background image/backgroundImage';
import LoginForm from '../../components/Login form/loginForm';

const LoginPage = () => {
	return (
		<Flex minHeight={'100vh'}>
			<LoginForm />
			<BackgroundImage />
		</Flex>
	);
};

export default LoginPage;
