import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

type BackButtonProps = {
	onClick: () => void;
	width?: string;
	text?: string;
};

const BackButton = ({ onClick, width, text }: BackButtonProps) => {
	return (
		<Button
			type="button"
			color={'#0E1420'}
			bg={'#E3F4ED'}
			borderRadius={'2rem'}
			p={'.5rem'}
			w={width ? width : 'full'}
			onClick={onClick}>
			<Flex
				gap={'1rem'}
				align={'center'}>
				<Icon as={FaArrowLeft} />
				{text && <Text>{text}</Text>}
			</Flex>
		</Button>
	);
};

export default BackButton;
