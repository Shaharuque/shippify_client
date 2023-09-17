import { Flex, Heading, Image } from '@chakra-ui/react';
import wavingHand from './../../assets/waving-hand.png';

const LoginGreeting = () => {
	return (
		<Flex align={'center'}>
			<Heading
				mb={'3rem'}
				fontWeight={'600'}>
				Good To See You Again!
			</Heading>
			<Image
				pos={'relative'}
				left={'-11rem'}
				src={wavingHand}
				boxSize={'3rem'}></Image>
		</Flex>
	);
};

export default LoginGreeting;
