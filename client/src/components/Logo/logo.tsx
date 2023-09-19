import { Image, Text, Flex } from '@chakra-ui/react';
import logo from './../../assets/logo design-cropped.svg';

const Logo = () => {
	return (
		<Flex
			align={'center'}
			gap={'.35rem'}
			p={'.25rem'}>
			<Image
				src={logo}
				boxSize={'5rem'}></Image>
			<Text
				fontWeight={'700'}
				fontSize={'1.25rem'}>
				Shi
				<Text
					as="span"
					color={'#2A9D8F'}>
					pp
				</Text>
				ify
			</Text>
		</Flex>
	);
};

export default Logo;
