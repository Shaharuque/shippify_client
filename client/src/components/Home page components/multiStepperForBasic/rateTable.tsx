import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

const tableHeads = ['Carrier', 'Service Type', 'Shipping amount', 'Insurance amount', 'Others amount', 'Delivery days', 'Carrier delivery days', 'Trackable'];

const RateTable = () => {
	const rates = useAppSelector((state: RootState) => state.rateDetails);
	return (
		<TableContainer>
			<Table
				variant="striped"
				colorScheme="grey">
				<TableCaption>Service Rates</TableCaption>
				<Thead>
					<Tr>
						{tableHeads.map((head: string, index: number) => (
							<Th
								key={index}
								borderBottom={'0'}>
								{head}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{rates.map((rate, index) => (
						<Tr key={index}>
							<Td borderBottom={0}>{rate?.carrier_name}</Td>
							<Td borderBottom={0}>{rate?.service_type}</Td>
							<Td borderBottom={0}>{rate?.shipping_amount.amount}</Td>
							<Td borderBottom={0}>{rate?.insurance_amount?.amount}</Td>
							<Td borderBottom={0}>{rate?.other_amount?.amount}</Td>
							<Td borderBottom={0}>{rate?.delivery_days}</Td>
							<Td borderBottom={0}>{rate?.carrier_delivery_days}</Td>
							<Td borderBottom={0}>{rate?.trackable}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default RateTable;
