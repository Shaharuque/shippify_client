import { Flex } from '@chakra-ui/react';
import BackgroundImage from '../../components/Background image/backgroundImage';
import MultistepRegistration from '../../components/Registration and setup components/Multi stepper for registration/multiStepperFormRegistration';

const RegisterPage = () => {
	return (
		<Flex minH={'100vh'}>
			<MultistepRegistration />
			<BackgroundImage />
		</Flex>
	);
};

export default RegisterPage;
