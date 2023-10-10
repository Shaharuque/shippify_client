import { Image, Text, Flex } from '@chakra-ui/react';
import logo from './../../assets/logo design-cropped.svg';

export type TLogo = {
	primaryColor?: string;
	isExpanded?: boolean;
};

const Logo = ({ primaryColor, isExpanded = true }: TLogo) => {
	return (
		<Flex
			align={'center'}
			gap={'.35rem'}
			p={'.25rem'}
			justify={'center'}>
			<Image
				src={logo}
				boxSize={'4rem'}></Image>
			{isExpanded ? (
				<Text
					fontWeight={'700'}
					fontSize={'1.25rem'}
					color={primaryColor}>
					Shi
					<Text
						as="span"
						color={'#2A9D8F'}>
						pp
					</Text>
					ify
				</Text>
			) : null}
		</Flex>
	);
};

export default Logo;
