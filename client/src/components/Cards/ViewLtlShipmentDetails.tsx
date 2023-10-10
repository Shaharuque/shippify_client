import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Text } from '@chakra-ui/react';
import moment from 'moment';

const ViewLtlShipmentDetails = ({ shipmentData }: { shipmentData: any }) => {
	const deliveryDate = new Date(`${shipmentData?.shipment_detail?.shipment?.pickup_date}`);
	deliveryDate.setDate(deliveryDate.getDate() + shipmentData?.shipment_detail?.estimated_delivery_days);
	// console.log('shipmentData', shipmentData);
	// console.log('shipmentData', shipmentData?.shipment_detail?.ship_from?.phone);
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
								<h1 className="font-bold text-teal-700">{shipmentData?.shipment_detail?.shipment?.ship_from?.address?.company_name}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Adress:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_from?.address?.address_line1}</h1>
							</div>
							<div className="flex gap-2">
								<h1>State:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_from?.address?.state_province}</h1>
							</div>
							<div className="flex gap-2">
								<h1>City:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_from?.address?.city_locality}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Postal Code:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_from?.address?.postal_code}</h1>
							</div>
							<div className="border border-[#437F8C] rounded mt-3 p-2 bg-[#437F8C] text-white shadow-md shadow-gray-600">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.shipment?.ship_from?.contact?.name}</h1>
								</div>
								<div className="flex gap-2 ">
									<h1>Phone No:</h1>
									<h1>{shipmentData?.shipment_detail?.shipment?.ship_from?.contact?.phone_number}</h1>
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
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_to?.address?.address_line1}</h1>
							</div>
							<div className="flex gap-2">
								<h1>State:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_to?.address?.state_province}</h1>
							</div>
							<div className="flex gap-2">
								<h1>City:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_to?.address?.city_locality}</h1>
							</div>
							<div className="flex gap-2">
								<h1>Postal Code:</h1>
								<h1 className="font-bold">{shipmentData?.shipment_detail?.shipment?.ship_to?.address?.postal_code}</h1>
							</div>
							<div className="border border-[#437F8C] rounded mt-3 p-2 bg-[#437F8C] text-white shadow-md shadow-gray-600">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.shipment?.ship_to?.contact?.name}</h1>
								</div>
								<div className="flex gap-2 ">
									<h1>Phone No:</h1>
									<h1>{shipmentData?.shipment_detail?.shipment?.ship_to?.contact?.phone_number}</h1>
								</div>
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
							{shipmentData?.shipment_detail?.shipment?.packages?.map((item: any, index: number) => (
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
								{moment(deliveryDate).format('MMMM D, YYYY')}
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
								{shipmentData?.bolDetail?.pro_number}
							</Text>
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

							{shipmentData?.shipment_detail?.charges?.map((item: any, index: number) => (
								<Box
									key={index}
									style={{
										borderBottom: '1px solid gray',
										marginBottom: '10px',
									}}>
									<div className="flex gap-2">
										<h1>Cost Type:</h1>
										<Text
											fontSize="sm"
											m={'.2rem 0'}>
											{item?.type}
										</Text>
									</div>
									<div className="flex gap-2">
										<h1>Description:</h1>
										<Text
											fontSize="sm"
											m={'.2rem 0'}>
											{item?.description}
										</Text>
									</div>
									<div className="flex gap-2">
										<h1>Amount:</h1>
										<p className="font-bold text-teal-700">
											{item?.amount?.value} ({item?.amount?.currency})
										</p>
									</div>
								</Box>
							))}
						</Box>

						<Box ml="auto">
							{/* <Heading
								size="sm"
								textTransform="uppercase">
								Total: {total?.toFixed(2)} (usd)
							</Heading> */}
						</Box>
					</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ViewLtlShipmentDetails;
