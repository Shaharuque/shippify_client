import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Image, Stack, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import noDataFound from '../../../assets/no-data-found.jpg';
import NoDataFound from '../../No service available/noDataFound';

const tableHeaders = ['From', 'To', 'Service'];

const RecentShipmentTable = () => {
	const [shipmentData, setShipmentData] = useState([]);

	useEffect(() => {
		setShipmentData([]);
	}, []);

	return (
		<>
			{shipmentData && shipmentData.length > 0 ? (
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
			) : (
				<>
					<NoDataFound text={'No data available'} />
				</>
			)}
		</>
	);
};

export default RecentShipmentTable;
