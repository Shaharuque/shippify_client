import { Button } from '@chakra-ui/react';

type SubmitButtonProps = {
	text: string;
	width?: string;
	onClick?: () => void;
};

const RegularButton = ({ text, width, onClick }: SubmitButtonProps) => {
	return (
		<Button
			type="button"
			color={'primary'}
			bg={'cta'}
			borderRadius={'2rem'}
			p={'.5rem'}
			w={width ? width : 'full'}
			onClick={onClick}>
			{text}
		</Button>
	);
};

export default RegularButton;
