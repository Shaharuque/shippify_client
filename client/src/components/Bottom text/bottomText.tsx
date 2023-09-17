import { Flex, Text } from '@chakra-ui/react';

const BottomText = () => {
	return (
		<Flex
			mt={'1rem'}
			gap={'.5rem'}
			align={'center'}>
			<Text
				fontWeight={'500'}
				fontSize={'1.05rem'}>
				Don't have an account?
			</Text>
			<Text
				color={'#264653'}
				textDecoration={'underline'}>
				Register
			</Text>
		</Flex>
	);
};

export default BottomText;
