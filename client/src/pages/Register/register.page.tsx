import { Flex } from '@chakra-ui/react';
import BackgroundImage from '../../components/Background image/backgroundImage';
import Multistep from '../../components/Multi stepper forms/multiStepperFormOnboarding';

const RegisterPage = () => {
	return (
		<Flex h={'100vh'}>
			<Multistep />
			<BackgroundImage />
		</Flex>
	);
};

export default RegisterPage;
