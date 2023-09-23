import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from '@chakra-ui/react';
import { useState } from 'react';

type SliderProps = {
	value: number;
	onChangeEnd: (value: number) => void;
};

const SliderComponent = ({ value, onChangeEnd }: SliderProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipValue, setTooltipValue] = useState(value);
	return (
		<Slider
			id="slider"
			defaultValue={5}
			min={100}
			max={5000}
			colorScheme="teal"
			size={'lg'}
			step={10}
			onChange={(v) => setTooltipValue(v)}
			onChangeEnd={(v) => onChangeEnd(v)}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}>
			<SliderMark
				value={100}
				mt=".5rem"
				ml="-2.5"
				fontSize="md"
				fontWeight={'600'}>
				100
			</SliderMark>

			<SliderMark
				value={5000}
				mt=".5rem"
				ml="-2.5"
				fontSize="md"
				fontWeight={'600'}>
				5000
			</SliderMark>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<Tooltip
				hasArrow
				bg="teal.500"
				color="white"
				placement="top"
				isOpen={showTooltip}
				label={`${tooltipValue}`}>
				<SliderThumb />
			</Tooltip>
		</Slider>
	);
};

export default SliderComponent;
