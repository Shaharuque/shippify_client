import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Text, Button } from '@chakra-ui/react';
import { TPackageDetailsForm } from '../Basic shipment/multiStepperForBasic/packageDetailsForm';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ViewShipmentDetails = ({ shipmentData }: { shipmentData: any }) => {
	// console.log('shipmentData', shipmentData);
	// console.log('shipmentData', shipmentData?.shipment_detail?.ship_from?.phone);
	const total_shipping_charge = Number(shipmentData?.labelDetail?.shipment_cost?.amount) + Number(shipmentData?.insurance_detail?.amount);
	const platform_fee = total_shipping_charge * 0.1;
	const total = total_shipping_charge + platform_fee;
	return (
		<Tabs
			isFitted
			variant="soft-rounded">
			<TabList
				mb="1em"
				mt={'2.5rem'}
				border={'1px solid white'}
				borderRadius={'2rem'}
				h={'4.5vh'}>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Address</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Delivery</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Payment</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<div className=" font-sans">
						<div className="bg-white mt-4 rounded p-3">
							<div className="mb-2 bg-[#437F8C] text-white rounded-full px-4 py-2 inline-flex items-center">Sender</div>
							<div className="flex gap-2">
								<h1>Company Name:</h1>
								<h1 className="font-bold text-teal-700">{shipmentData?.shipment_detail?.ship_from?.company_name}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Adress:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_from?.address_line1}</h1>
							</div>
							<div className="flex gap-2">
								<h1>State:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_from?.state_province}</h1>
							</div>
							<div className="flex gap-2">
								<h1>City:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_from?.city_locality}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Postal Code:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_from?.postal_code}</h1>
							</div>
							<div className="border border-[#437F8C] rounded mt-3 p-2 bg-[#437F8C] text-white shadow-md shadow-gray-600">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.name}</h1>
								</div>
								<div className="flex gap-2 ">
									<h1>Phone No:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.phone}</h1>
								</div>
							</div>
						</div>
						<div className="bg-white mt-4 rounded p-3">
							{/* <div className="flex gap-2">
								<h1>Company Name:</h1>
								<h1 className="font-bold text-teal-700">{shipmentData?.shipment_detail?.ship_to?.company_name || 'N/A'}</h1>
							</div> */}
							<div className="mb-2 bg-[#437F8C] text-white rounded-full px-4 py-2 inline-flex items-center">Receiver</div>
							<div className="flex gap-2">
								<h1>Adress:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_to?.address_line1}</h1>
							</div>
							<div className="flex gap-2">
								<h1>State:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_to?.state_province}</h1>
							</div>
							<div className="flex gap-2">
								<h1>City:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_to?.city_locality}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Postal Code:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.ship_to?.postal_code}</h1>
							</div>
							<div className="border border-[#437F8C] rounded mt-3 p-2 bg-[#437F8C] text-white shadow-md shadow-gray-600">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_to?.name}</h1>
								</div>
								{/* <div className="flex gap-2 ">
									<h1>Phone No:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_to?.phone}</h1>
								</div> */}
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="bg-white rounded border-gray-200 p-3">
						<Box flex={0.5}>
							<Heading
								size="sm"
								textTransform="uppercase">
								Packages Details
							</Heading>
							{shipmentData?.shipment_detail?.packages?.map((item: TPackageDetailsForm, index: number) => (
								<Box key={index}>
									<Text
										pt="2"
										fontSize="sm"
										fontWeight="600">
										Package {index + 1}
									</Text>
									<Text fontSize="sm">
										Weight: {item?.weight?.value} {item?.weight?.unit}
									</Text>
									<Text fontSize="sm">
										Dimensions: {item?.dimensions?.length}x{item?.dimensions?.width}x{item?.dimensions?.height} {item?.dimensions?.unit}
									</Text>
								</Box>
							))}
						</Box>

						<div className="mt-4">
							<Heading
								size="sm"
								textTransform="uppercase">
								Estimated Delivery Date
							</Heading>
							<Text
								fontSize="sm"
								fontWeight={'700'}>
								{moment(shipmentData?.rateDetail?.estimated_delivery_date).format('MMMM D, YYYY')}
							</Text>
						</div>

						<div className="mt-4">
							<Heading
								size="sm"
								textTransform="uppercase">
								Tracking Number
							</Heading>
							<Text
								fontSize="xs"
								fontWeight={'700'}
								color={'gray'}>
								{shipmentData?.labelDetail?.tracking_number}
							</Text>

							<div className='bg-[#437F8C] rounded p-2 text-white mt-2 text-center'>
								<Link to='/tracking'>Go Tracking!</Link>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="bg-white rounded border-gray-200 p-3">
						<Box>
							<Heading
								size="sm"
								textTransform="uppercase">
								Cost details
							</Heading>
							<Text
								fontSize="sm"
								m={'.2rem 0'}>
								Shipping cost: {shipmentData?.labelDetail?.shipment_cost?.amount} ({shipmentData?.labelDetail?.shipment_cost?.currency})
							</Text>
							<Text
								fontSize="sm"
								m={'.2rem 0'}>
								Other costs: {0} ({shipmentData?.labelDetail?.shipment_cost?.currency})
							</Text>
							<Text
								fontSize="sm"
								m={'.2rem 0'}>
								Insurance: {shipmentData?.insurance_detail?.amount} (usd)
							</Text>
							<Text
								fontSize="sm"
								m={'.2rem 0'}>
								Platform fee: {platform_fee} ({shipmentData?.labelDetail?.insurance_cost?.currency})
							</Text>
						</Box>

						{total > 0 && (
							<Box ml="auto">
								<Heading
									size="sm"
									textTransform="uppercase">
									Total: {total?.toFixed(2)} (usd)
								</Heading>
							</Box>
						)}

						{shipmentData?.shipment_detail?.shipment_status === 'unknown' && (
							<Box mt={'2rem'}>
								<Button> Claim insurance</Button>
							</Box>
						)}
					</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ViewShipmentDetails;
