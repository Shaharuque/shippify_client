import { Box, Text, VStack } from '@chakra-ui/react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

type CountdownTimerProps = {
	duration: number;
	onClick: () => void;
};

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
	if (remainingTime === 0) {
		return <Text>Too late...</Text>;
	}

	return (
		<VStack>
			<Text>Remaining</Text>
			<Text
				fontSize={'1.5rem'}
				fontWeight={'600'}>
				{remainingTime}
			</Text>
			<Text>seconds</Text>
		</VStack>
	);
};

const CountdownTimer = () => {
	return (
		<>
			<CountdownCircleTimer
				size={160}
				strokeWidth={10}
				isPlaying
				duration={59}
				colors={['#004777', '#F7B801', '#A30000', '#A30000']}
				colorsTime={[45, 30, 15, 0]}
				onComplete={() => ({ shouldRepeat: true, delay: 1 })}>
				{renderTime}
			</CountdownCircleTimer>
		</>
	);
};

export default CountdownTimer;
