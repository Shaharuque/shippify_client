import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

const tableHeaders = ['From', 'To', 'Service'];

const RecentShipmentTable = () => {
	return (
		<TableContainer>
			<Table
				variant="striped"
				colorScheme="grey">
				<TableCaption placement="top">Recent Shipments</TableCaption>
				<Thead>
					<Tr>
						{tableHeaders.map((header, index) => (
							<Th
								key={index}
								borderBottom={0}>
								{header}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td borderBottom={'0'}>CA, USA</Td>
						<Td borderBottom={'0'}>TX, USA</Td>
						<Td borderBottom={'0'}>DHL</Td>
					</Tr>
					<Tr>
						<Td borderBottom={'0'}>CA, USA</Td>
						<Td borderBottom={'0'}>TX, USA</Td>
						<Td borderBottom={'0'}>DHL</Td>
					</Tr>
					<Tr>
						<Td borderBottom={0}>CA, USA</Td>
						<Td borderBottom={0}>TX, USA</Td>
						<Td borderBottom={0}>DHL</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default RecentShipmentTable;
