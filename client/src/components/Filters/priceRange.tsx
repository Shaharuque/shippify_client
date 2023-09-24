import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Box, Tooltip, RangeSliderMark, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type PriceRangeFilterProps = {
	minValue: number;
	maxValue: number;
	onRangeChange: (value: number[]) => void;
};

const PriceRangeFilter = ({ minValue, maxValue, onRangeChange }: PriceRangeFilterProps) => {
	const [showTooltip, setShowTooltip] = useState([false, false]);
	const initialMinValue = isFinite(minValue) ? minValue : 0;
	const initialMaxValue = isFinite(maxValue) ? maxValue : 2000;

	const [sliderValue, setSliderValue] = useState([initialMinValue, initialMaxValue]);

	return (
		<Box mb="1.5rem">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Price Range
			</Text>
			<RangeSlider
				aria-label={['min', 'max']}
				min={minValue > maxValue ? 0 : minValue}
				max={minValue > maxValue ? 2000 : maxValue}
				defaultValue={minValue > maxValue ? [0, 2000] : [minValue, maxValue]}
				onChangeEnd={(val) => {
					onRangeChange(val);
					setSliderValue(val);
				}}
				onMouseEnter={() => setShowTooltip([true, true])}
				onMouseLeave={() => setShowTooltip([false, false])}>
				<RangeSliderMark
					value={minValue > maxValue ? 0 : minValue}
					mt="2"
					ml="-2"
					fontSize="md"
					fontWeight={'600'}>
					{minValue > maxValue ? 0 : minValue}
				</RangeSliderMark>

				<RangeSliderMark
					value={minValue > maxValue ? 2000 : maxValue}
					mt="2"
					ml="-6"
					fontSize="md"
					fontWeight={'600'}>
					{minValue > maxValue ? 2000 : maxValue}
				</RangeSliderMark>

				<RangeSliderTrack>
					<RangeSliderFilledTrack bg={'teal'} />
				</RangeSliderTrack>

				<Tooltip
					hasArrow
					bg="teal.500"
					color="white"
					placement="top"
					isOpen={showTooltip[0]}
					label={sliderValue[0]}>
					<RangeSliderThumb index={0} />
				</Tooltip>

				<Tooltip
					hasArrow
					bg="teal.500"
					color="white"
					placement="top"
					isOpen={showTooltip[1]}
					label={sliderValue[1]}>
					<RangeSliderThumb index={1} />
				</Tooltip>
			</RangeSlider>
		</Box>
	);
};

export default PriceRangeFilter;
