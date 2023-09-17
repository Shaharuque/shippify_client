import { Text } from '@chakra-ui/react';

type FormHelperTextProps = {
	text: string;
};

const FormHelperText = ({ text }: FormHelperTextProps) => {
	return (
		<Text
			fontSize={'1rem'}
			color={'#808080'}
			fontWeight={'500'}>
			{text}
		</Text>
	);
};

export default FormHelperText;
