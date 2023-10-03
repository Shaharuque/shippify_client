import axios from 'axios';
import { useEffect, useState } from 'react';
import ShipmentCard from '../Cards/shipmentCard';
import { Flex, Stack, Image, Text } from '@chakra-ui/react';
import noDataFound from '../../assets/no-data-found.jpg';

<<<<<<< HEAD
const ShipmentCardList = () => {
	const [shipmentList, setShipmentList] = useState([]);
	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				const result = await axios.get('http://192.168.68.89:5000/shipment/all-shipment', {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});
				console.log('result:', result?.data);
				setShipmentList(result?.data?.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);
=======
>>>>>>> origin/amin


export interface IShipment {
	tableData: any;
	clickedCard:(cardId:any)=>void
}
const ShipmentCardList = ({tableData, clickedCard}:IShipment) => {
	console.log('tableData',tableData)

	return (
		<>
			{tableData && tableData?.length > 0 ? (
				<Flex
					flexWrap="wrap"
					h={'750px'}
					mb={'2rem'}
					overflowY={'scroll'}
					css={{
						'&::-webkit-scrollbar': {
							width: '0',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '0.25em',
						},
					}}>
					{tableData?.map((shipment: any, index: number) => {
						if (shipment.labelDetail) {
							return (
								<ShipmentCard
									clickedCard={clickedCard}
									key={index}
									shipment={shipment}
								/>
							);
						} else {
							return null;
						}
					})}
				</Flex>
			) : (
				<Stack align={'center'}>
					<Text
						textAlign={'center'}
						fontFamily={'Roboto'}
						fontWeight={'600'}>
						No Data Available
					</Text>
				</Stack>
			)}
		</>
	);
};

export default ShipmentCardList;
