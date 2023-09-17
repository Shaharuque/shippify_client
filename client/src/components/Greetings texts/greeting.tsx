import { Flex, Heading, Image } from '@chakra-ui/react';
import wavingHand from './../../assets/waving-hand.png';

type GreetingProp = {
	text: string;
	emoji?: boolean;
};

const Greeting = ({ text, emoji }: GreetingProp) => {
	return (
		<Flex align={'center'}>
			<Heading
				mb={'3rem'}
				lineHeight={'3rem'}
				fontWeight={'600'}>
				{text}
			</Heading>
			{emoji && (
				<Image
					pos={'relative'}
					left={'-11rem'}
					top={'-.15rem'}
					src={wavingHand}
					boxSize={'3rem'}></Image>
			)}
		</Flex>
	);
};

export default Greeting;
