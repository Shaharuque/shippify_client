import { Image, Text, Flex } from '@chakra-ui/react';
import logo from './../../assets/logo design.svg';

type LogoProps = {
	boxSize: string;
	fontSize: string;
};

const Logo = ({ boxSize, fontSize }: LogoProps) => {
	return (
		<Flex align={'center'}>
			<Image
				src={logo}
				boxSize={boxSize}></Image>
			<Text
				fontWeight={'700'}
				fontSize={fontSize}>
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
