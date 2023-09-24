import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Box } from '@chakra-ui/react';

const PriceRange = () => {
	return (
		<Box mb="4">
			<RangeSlider
				aria-label={['min', 'max']}
				onChangeEnd={(val) => console.log(val)}>
				<RangeSliderTrack>
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				<RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} />
			</RangeSlider>
		</Box>
	);
};

export default PriceRange;
