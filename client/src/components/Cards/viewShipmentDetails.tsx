import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Text } from '@chakra-ui/react';
import { TPackageDetailsForm } from '../Basic shipment/multiStepperForBasic/packageDetailsForm';
import moment from 'moment';

const ViewShipmentDetails = ({ shipmentData }) => {
	console.log('shipmentData', shipmentData);
	console.log('shipmentData', shipmentData?.shipment_detail?.ship_from?.phone);
	return (
		<Tabs
			isFitted
			variant="soft-rounded">
			<TabList
				mb="1em"
				border={'1px solid white'}
				borderRadius={'1rem'}>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Address</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Delivery details</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Payment Details</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<div className=" font-sans">
						<div className="bg-white mt-4 rounded p-3">
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
							<div className="border border-gray-200 rounded mt-3 p-2 bg-gray-400 text-white">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.name}</h1>
								</div>
								<div className="flex gap-2 ">
									<h1>Phone No.:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.phone}</h1>
								</div>
							</div>
						</div>
						<div className="bg-white mt-4 rounded p-3">
							<div className="flex gap-2">
								<h1>Company Name:</h1>
								<h1 className="font-bold text-teal-700">{shipmentData?.shipment_detail?.ship_to?.company_name || 'N/A'}</h1>
							</div>
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
							<div className="border border-gray-200 rounded mt-3 p-2 bg-gray-400 text-white">
								<div className="flex gap-2">
									<h1>Name:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.name}</h1>
								</div>
								<div className="flex gap-2 ">
									<h1>Phone No.:</h1>
									<h1>{shipmentData?.shipment_detail?.ship_from?.phone}</h1>
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
							{shipmentData?.shipment_detail?.packages?.map((item: TPackageDetailsForm, index) => (
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
							{shipmentData?.shipment_detail?.packages?.map((item: TPackageDetailsForm, index) => (
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
						</div>
					</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ViewShipmentDetails;
