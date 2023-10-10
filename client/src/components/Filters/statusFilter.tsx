import { Select, Box, Text } from '@chakra-ui/react';

type statusFilterProps = {
	onChange: (value: string) => void;
	dataLoading?: boolean;
};
const StausFilter = ({ onChange, dataLoading }: statusFilterProps) => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Status
			</Text>
			<Select
				disabled={dataLoading ? true : false}
				onChange={(e: any) => onChange(e.target.value)}
				defaultValue={'asc'}
				border={'2px solid gray'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={''}>Select</option>
				<option value={'label_purchased'}>Label Purchased</option>
				<option value={'in_transit'}>In Transit</option>
				<option value={'received'}>Received</option>
				<option value={'dropped_at_service_point'}>Dropped at Service Point</option>
				<option value={'reached_at_service_point'}>Reached at Service Point</option>
				<option value={'unknown'}>Unknown</option>
				<option value={'returned'}>Returned</option>
			</Select>
		</Box>
	);
};

export default StausFilter;
