import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type BottomTextProps = {
	text: string;
	link: string;
};

const BottomText = ({ text, link }: BottomTextProps) => {
	return (
		<Flex
			mt={'1rem'}
			gap={'.5rem'}
			align={'center'}>
			<Text
				fontWeight={'500'}
				fontSize={'1.05rem'}>
				{text} have an account?
			</Text>
			<Link to={`/${link}`}>
				<Text
					color={'#264653'}
					textDecoration={'underline'}
					textTransform={'capitalize'}>
					{link}
				</Text>
			</Link>
		</Flex>
	);
};

export default BottomText;
