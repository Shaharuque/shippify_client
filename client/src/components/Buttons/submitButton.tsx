import { Button, VStack, Text, Spinner } from '@chakra-ui/react';

type SubmitButtonProps = {
	text: string;
	width?: string;
	isDisabled?: boolean;
	error_message?: string;
	showErrorMessage?: boolean;
	isLoading?: boolean;
};

const SubmitButton = ({ text, width, isDisabled, error_message, showErrorMessage, isLoading }: SubmitButtonProps) => {
	return (
		<VStack>
			<Button
				type="submit"
				color={'primary'}
				bg={'cta'}
				borderRadius={'2rem'}
				p={'.5rem'}
				w={width ? width : 'full'}
				isDisabled={isDisabled}
				gap={'1rem'}>
				{text} {isLoading && <Spinner />}
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
