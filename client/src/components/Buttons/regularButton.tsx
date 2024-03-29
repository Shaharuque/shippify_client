import { Button, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

type RegularButtonProps = {
	text: string;
	width?: string;
	onClick?: () => void;
	isDisabled?: boolean;
	error_message?: string;
	onHoverColor?: string;
	isLoading?: boolean;
	loadingText?: string;
};

const RegularButton = ({ text, width, onClick, isDisabled, error_message, onHoverColor, isLoading, loadingText }: RegularButtonProps) => {
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const handleClick = () => {
		if (!isDisabled && onClick) {
			onClick();
		}
		setShowErrorMessage((prev) => !prev);
	};

	return (
		<VStack>
			<Button
				type="button"
				color={'primary'}
				bg={isDisabled ? '#7ea4ad' : 'cta'}
				borderRadius={'2rem'}
				p={'.5rem'}
				w={width ? width : 'full'}
				onClick={handleClick}
				isLoading={isLoading}
				_hover={{ bg: onHoverColor }}>
				{loadingText ? loadingText : text}
			</Button>
			{isDisabled && showErrorMessage && error_message ? (
				<Text
					whiteSpace={'nowrap'}
					fontSize={'.75rem'}
					color={'red'}>
					{error_message}
				</Text>
			) : null}
		</VStack>
	);
};

export default RegularButton;
