import { Select, Box, Text } from '@chakra-ui/react';

type weightFilterProps = {
	onChange: (value: string) => void;
	dataLoading?: boolean;
};

const WeightFilter = ({ onChange, dataLoading }: weightFilterProps) => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Weight
			</Text>
			<Select
				disabled={dataLoading ? true : false}
				onChange={(e: any) => onChange(e.target.value)}
				border={'2px solid gray'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={''}>Select</option>
				<option value={'asc'}>Ascending</option>
				<option value={'desc'}>Descending</option>
			</Select>
		</Box>
	);
};

export default WeightFilter;
