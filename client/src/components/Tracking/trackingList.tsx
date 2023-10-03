import { Box, Flex } from '@chakra-ui/react';
import TrackingCard from './trackingCard';
import ShipmentSteppers from '../Steppers/shipmentSteppers';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TrackingInfo {
	id: string;
	shipFrom: string;
	shipTo: string;
	deliveryStatus: string;
	estimatedDeliveryDate: string;
}


const status = [{ title: 'Dropped at service point' }, { title: 'Picked up from service point' }, { title: 'In transit' }, { title: 'Lost' }, { title: 'Delivered' }];

const TrackingList = () => {
	const [tableData,setTableData]=useState([])

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchTableData = async () => {
			try {
				const response = await axios.post(
					`http://192.168.68.89:5000/shipment/sort-by-package-and-price`,
					{	carrier_id:'',
						priceSort: "",
						weightSort: "",
						shipment_status: "",
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				console.log('result:', response.data);
				setTableData(response?.data?.result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);


	const token=localStorage.getItem('token')
	// const [fetchSingleShipment,{data:shipmentData,isLoading:dataLaoding}]=useFetchSingleShipmentMutation()
	// console.log('single data from parent',shipmentData,dataLaoding)

	const clickedCard:any=(cardId:any)=>{
		console.log('clicked',cardId)
		// fetchSingleShipment({token,id:cardId})
	}
	

	return (
		<Flex>
			
		<Flex px={'50px'}>
			<Box
				p={'.5rem'}
				overflowY={'scroll'}
				h={'70vh'}
				css={{
					'&::-webkit-scrollbar': {
						width: '0',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderRadius: '0.25em',
					},
				}}>
				{tableData.map((item,i) => (
					<TrackingCard
					clickedCard={clickedCard}
						key={i}
						item={item}
					/>
				))}
			</Box>
			<Flex justify={'center'} >
				<Box>
				<ShipmentSteppers
					activeStep={3}
					steps={status}
					/>
					</Box>
			</Flex>
		</Flex>
		</Flex>
	);
};

export default TrackingList;
