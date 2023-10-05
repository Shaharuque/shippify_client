import { useState, useEffect } from 'react';
import { Progress, Text } from '@chakra-ui/react';

const DynamicProgressBar = ({ isLoading }: { isLoading: boolean }) => {
	const [displayText, setDisplayText] = useState('Loading...');
	const [progressValue, setProgressValue] = useState(0);

	useEffect(() => {
		const progressInterval = setInterval(() => {
			setProgressValue((prevValue) => {
				if (prevValue < 100) {
					return prevValue + 10;
				}
				clearInterval(progressInterval);
				return prevValue;
			});
		}, 2000);

		const texts = ['Getting ready...', 'Uploading data...', 'Generating hash...', 'Almost there...', 'Finalizing...', 'Completing...', 'Done!'];

		let index = 0;
		const textInterval = setInterval(() => {
			setDisplayText(texts[index]);
			index = (index + 1) % texts.length;
		}, 15000);

		return () => {
			clearInterval(progressInterval);
			clearInterval(textInterval);
		};
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setDisplayText('Done!');
		}
	}, [isLoading]);

	return (
		<>
			{isLoading && (
				<Progress
					value={progressValue}
					min={0}
					max={100}
					colorScheme="teal"
					isAnimated
					hasStripe
					isIndeterminate
					borderRadius={'1rem'}
					h={'1rem'}
				/>
			)}
			<Text
				mt={2}
				fontSize={'1.15rem'}
				color={'cta'}>
				{displayText}
			</Text>
		</>
	);
};

export default DynamicProgressBar;
