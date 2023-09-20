import { Button } from '@chakra-ui/react';

type SubmitButtonProps = {
	text: string;
	width?: string;
};

const SubmitButton = ({ text, width }: SubmitButtonProps) => {
	return (
		<Button
			type="submit"
			color={'primary'}
			bg={'cta'}
			borderRadius={'2rem'}
			w={width ? width : 'full'}>
			{text}
		</Button>
	);
};

export default SubmitButton;
