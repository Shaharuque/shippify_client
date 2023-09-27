import { Select, Box, Text } from '@chakra-ui/react';

const StausFilter = () => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Status
			</Text>
			<Select
				defaultValue={'asc'}
				border={'1px solid #0E1420'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={'asc'}>Pending</option>
				<option value={'desc'}>In transit</option>
				<option value={'desc'}>Descending</option>
				<option value={'desc'}>Descending</option>
				<option value={'desc'}>Unknown</option>
				<option value={'desc'}>Delivered</option>
			</Select>
		</Box>
	);
};

export default StausFilter;
