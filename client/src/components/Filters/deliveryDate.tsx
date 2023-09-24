import { Box, Select, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

type DeliveryDateFilterProp = {
	onChange: (value: string) => void;
};
const DeliveryDateFilter = ({ onChange }: DeliveryDateFilterProp) => {
	return (
		<Box mb="4">
			<Text
				fontWeight="600"
				mb={'.75rem'}>
				Delivery Date
			</Text>
			<Select
				onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
				defaultValue={'asc'}
				border={'1px solid #0E1420'}
				_focusVisible={{ boxShadow: '0 0 2.5px #0E1420' }}>
				<option value={'asc'}>Ascending</option>
				<option value={'desc'}>Descending</option>
			</Select>
		</Box>
	);
};

export default DeliveryDateFilter;
