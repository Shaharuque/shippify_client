import { Button } from '@chakra-ui/react';

type SubmitButtonProps = {
	text: string;
};

const SubmitButton = ({ text }: SubmitButtonProps) => {
	return (
		<Button
			type="submit"
			mt={'2rem'}
			color={'primary'}
			bg={'cta'}
			borderRadius={'2rem'}
			w={'full'}>
			{text}
		</Button>
	);
};

export default SubmitButton;
