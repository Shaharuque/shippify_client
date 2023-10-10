import { Flex, Spinner } from '@chakra-ui/react';
import StatCards from '../../Cards/statCards';
import { RiShipLine } from 'react-icons/ri';
import { TbPackageOff } from 'react-icons/tb';
import { LuBadgeDollarSign } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SpinningLoader from '../../Loader/spinningLoader';

const StatCardList = () => {
	const [shipmentData, setShipmentData] = useState({});
	const [loading, setLoading] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		try {
			const fetchBasicShipmentData = async () => {
				setLoading(true);
				const basicResponse = await axios.get(
					`http://localhost:5000/shipment/info/about/shipment`,
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				setLoading(false);
				setShipmentData(basicResponse?.data);
			};

			fetchBasicShipmentData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	console.log(shipmentData?.totalbasicShipment)

	return (
		<>
			<div className='flex justify-around mb-[10px] gap-4'>
				<StatCards
					title={'Total Shipment'}
					value={shipmentData?.totalbasicShipment}
					icon={RiShipLine}
					color={'secondary'}
					bg={'black'}
				/>
				<StatCards
					title={'Total Insured'}
					value={shipmentData?.totalInsuranceShipment}
					icon={TbPackageOff}
					color={'red.500'}
					bg={'#FA8072'}
				/>
				<StatCards
					title={'BNPL Shipment'}
					value={shipmentData?.totalBNPLShipment}
					icon={LuBadgeDollarSign}
					color={'green.500'}
					bg={'teal'}
				/>
				<StatCards
					title={'Total Spent'}
					value={Number(shipmentData?.totalPaidAmount).toFixed(2)}
					sign={'$'}
					icon={LuBadgeDollarSign}
					color={'green.500'}
					bg={'brown'}
				/>
				<StatCards
					title={'Total Spent'}
					value={18000}
					icon={LuBadgeDollarSign}
					color={'green.500'}
					bg={'gray'}
				/>
			</div>

		</>
	);
};

export default StatCardList;
