import { Button, VStack, Text } from '@chakra-ui/react';

type SubmitButtonProps = {
	text: string;
	width?: string;
	isDisabled?: boolean;
	error_message?: string;
	showErrorMessage?: boolean;
};

const SubmitButton = ({ text, width, isDisabled, error_message, showErrorMessage }: SubmitButtonProps) => {
	return (
		<VStack>
			<Button
				type="submit"
				color={'primary'}
				bg={'cta'}
				borderRadius={'2rem'}
				p={'.5rem'}
				w={width ? width : 'full'}
				isDisabled={isDisabled}>
				{text}
			</Button>
			{isDisabled && showErrorMessage ? (
				<Text
					fontSize={'.75rem'}
					color={'red'}>
					{error_message}
				</Text>
			) : null}
		</VStack>
	);
};

export default SubmitButton;
