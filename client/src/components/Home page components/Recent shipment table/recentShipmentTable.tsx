import { useEffect, useState } from 'react';
import noDataFound from '../../../assets/no-data-found.jpg';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface DataType {
	record: any;
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const tableHeaders = ['From', 'To', 'Service'];


const RecentShipmentTable = () => {
	const [shipmentData, setShipmentData] = useState([]);
	const [lTLTableData, setLTLTableData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const token = localStorage.getItem('token');

	useEffect(() => {
		try {
			const fetchBasicShipmentData = async () => {
				setLoading(true);
				const basicResponse = await axios.post(
					`http://localhost:5000/shipment/sort-by-package-and-price`,
					{ carrier_id: '', priceSort: "", weightSort: "", shipment_status: "" },
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				const ltlResponse = await axios.get(
					`http://localhost:5000/ltlShipment/my-shipment-list`,
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					}
				);
				setShipmentData(basicResponse?.data?.result?.slice(0, 7));
				setLTLTableData(ltlResponse?.data?.data);
				setLoading(false);
			};

			fetchBasicShipmentData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const columns: ColumnsType<DataType> = [
		{
			title: 'Carrier',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => <h1>{record?.labelDetail?.carrier_code}</h1>,
		},
		{
			title: 'Service',
			dataIndex: 'name',
			key: 'name',
			ellipsis: true,
			render: (_,record) => <h1 className=' break-words'>{record?.labelDetail?.service_code?.slice(0,8)}...</h1>
		},
		
		{
			title: 'From',
			dataIndex: 'fromaddress',
			key: 'fromaddress',
			render: (_, record) => <h1 className='text-center'>{record?.shipment_detail?.ship_from?.city_locality?.slice(0,8)}...</h1>
		},
		{
			title: 'To',
			dataIndex: 'toadress',
			key: 'toadress',
			render: (_, record) => <h1 className='text-center'>{record?.shipment_detail?.ship_to?.city_locality?.slice(0,8)}...</h1>
		},
		{
			title: 'Shipping Rate',
			dataIndex: 'rate',
			key: 'rate',
			render: (_, record) => <h1 className='text-center'>{record?.rateDetail?.shipping_amount?.amount}$</h1>
		},
		{
			title: 'Insurance',
			dataIndex: 'insurance',
			key: 'insurance',
			render: (_, record) => <h1 className='text-center'>{record?.insurance_detail?.fee?.amount}$</h1>
		},
		{
			title: 'Paid',
			dataIndex: 'payment',
			key: 'payment',
			render: (_, record) => <h1>{Number(record?.payment_detail?.net_payable).toFixed(2)}$</h1>
		}
		// {
		// 	title: 'Tags',
		// 	key: 'tags',
		// 	dataIndex: 'tags',
		// 	render: (_, { tags }) => (
		// 		<>
		// 			{tags.map((tag) => {
		// 				let color = tag.length > 5 ? 'geekblue' : 'green';
		// 				if (tag === 'loser') {
		// 					color = 'volcano';
		// 				}
		// 				return (
		// 					<Tag color={color} key={tag}>
		// 						{tag.toUpperCase()}
		// 					</Tag>
		// 				);
		// 			})}
		// 		</>
		// 	),
		// }
	];


	return (
		<div className='h-[350px] 2xl:h-[450px] overflow-x-scroll bg-white rounded-md'>

			<Table pagination={false} //pagination dekhatey chailey just 'true' korey dilei hobey
				rowKey={(record) => record?._id} //record is kind of whole one data object and here we are assigning id as key
				className='font-semibold'
				bordered
				columns={columns}
				dataSource={shipmentData} />

			<div className='flex justify-end mr-2'>
				<Link to='/dashboard' className='bg-[#67a5c9] p-2 mt-2 rounded text-white'>See More...</Link>	
			</div>	
		</div>
	);
};

export default RecentShipmentTable;
