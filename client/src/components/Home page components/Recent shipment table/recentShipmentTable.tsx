import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

const RecentShipmentTable = () => {
	return (
		<TableContainer>
			<Table
				variant="striped"
				colorScheme="grey">
				<TableCaption>Recent Shipments</TableCaption>
				<Thead>
					<Tr>
						<Th borderBottom={'0'}>From</Th>
						<Th borderBottom={'0'}>To</Th>
						<Th borderBottom={'0'}>Service</Th>
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
