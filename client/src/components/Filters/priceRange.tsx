import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Box, Tooltip, RangeSliderMark, Text } from '@chakra-ui/react';
import { useState } from 'react';

type PriceRangeFilterProps = {
	onRangeChange: (value: number[]) => void;
};

const PriceRangeFilter = ({ onRangeChange }: PriceRangeFilterProps) => {
	const [showTooltip, setShowTooltip] = useState([false, false]);

	const [sliderValue, setSliderValue] = useState([0, 2000]);

	return (
		<Box mb="1.5rem">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Price Range
			</Text>
			<RangeSlider
				aria-label={['min', 'max']}
				min={0}
				max={2000}
				defaultValue={[0, 2000]}
				onChangeEnd={(val) => {
					onRangeChange(val);
					setSliderValue(val);
				}}
				onMouseEnter={() => setShowTooltip([true, true])}
				onMouseLeave={() => setShowTooltip([false, false])}>
				<RangeSliderMark
					value={sliderValue[0]}
					mt="2"
					ml="-2"
					fontSize="md"
					fontWeight={'600'}>
					{sliderValue[0]}
				</RangeSliderMark>

				<RangeSliderMark
					value={sliderValue[1]}
					mt="2"
					ml="-6"
					color={'red'}
					fontSize="md"
					fontWeight={'600'}>
					{sliderValue[1]}
				</RangeSliderMark>

				<RangeSliderTrack color={'#314866'}>
					<RangeSliderFilledTrack bg={'teal'} />
				</RangeSliderTrack>

				{/* <RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} /> */}

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
