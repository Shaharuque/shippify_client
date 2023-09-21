import { Button, Icon } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';

type BackButtonProps = {
	onClick: () => void;
	width?: string;
};

const BackButton = ({ onClick, width }: BackButtonProps) => {
	return (
		<Button
			type="button"
			color={'#0E1420'}
			bg={'#E3F4ED'}
			borderRadius={'2rem'}
			p={'.5rem'}
			w={width ? width : 'full'}
			onClick={onClick}>
			<Icon as={FaArrowLeft} />
		</Button>
	);
};

export default BackButton;
