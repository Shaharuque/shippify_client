import axios from 'axios';
import { useEffect, useState } from 'react';
import ShipmentCard from '../Cards/shipmentCard';

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
				console.log('result:', result.data);
				setShipmentList(result?.data?.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTableData();
	}, []);

	useEffect(() => {
		console.log('list:', shipmentList);
	}, [shipmentList]);
	return (
		<div>
			{shipmentList.map((shipment: any, index: number) => {
				if (shipment.labelDetail) {
					return (
						<ShipmentCard
							key={index}
							shipment={shipment}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

export default ShipmentCardList;
