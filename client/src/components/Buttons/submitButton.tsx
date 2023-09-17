import { Button } from '@chakra-ui/react';

const SubmitButton = () => {
	return (
		<Button
			type="submit"
			mt={'2rem'}
			color={'primary'}
			bg={'cta'}
			borderRadius={'2rem'}
			w={'full'}>
			Sign In
		</Button>
	);
};

export default SubmitButton;
