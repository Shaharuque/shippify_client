import { Box, Select, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

type PriceAscendingDescendingFilterProp = {
	onChange: (value: string) => void;
};
const PriceAscendingDescendingFilter = ({ onChange }: PriceAscendingDescendingFilterProp) => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Price
			</Text>
			<Select
				onChange={(v: ChangeEvent<HTMLSelectElement>) => onChange(v.target.value)}
				defaultValue={'asc'}
				border={'1px solid #0E1420'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={'asc'}>Ascending</option>
				<option value={'desc'}>Descending</option>
			</Select>
		</Box>
	);
};

export default PriceAscendingDescendingFilter;