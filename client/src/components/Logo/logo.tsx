import { Image, Text, Flex } from '@chakra-ui/react';
import logo from './../../assets/logo design.svg';

const Logo = () => {
	return (
		<Flex align={'center'}>
			<Image
				src={logo}
				boxSize={'8rem'}></Image>
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
