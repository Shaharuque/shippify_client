import { Select, Box, Text } from '@chakra-ui/react';

const WeightFilter = () => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Weight
			</Text>
			<Select
				defaultValue={'asc'}
				border={'1px solid #0E1420'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={'asc'}>Ascending</option>
				<option value={'desc'}>Descending</option>
			</Select>
		</Box>
	);
};

export default WeightFilter;
