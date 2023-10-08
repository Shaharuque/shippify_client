import { Box, Card, CardHeader, Heading, CardBody, Stack, StackDivider, HStack, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { countryCodeDictionary } from '../../data/countryCodeDictionary';

const swappedCountryCodeDictionary: { [key: string]: string } = {};
for (const key in countryCodeDictionary) {
	const value = countryCodeDictionary[key];
	swappedCountryCodeDictionary[value] = key;
}

const QuoteSummary = () => {
	const ltlShipmentInfo = useAppSelector((state: RootState) => state?.ltlShipments?.shipment);
	const ltlShipmentCharges = useAppSelector((state: RootState) => state?.ltlTotalCharge);
	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);
	const total_shipping_charge = Number(ltlShipmentCharges?.amount?.value) + Number(insuranceDetails?.insurance_amount);
	const total = total_shipping_charge + total_shipping_charge * 0.1;

	return (
		<Card
			bg={'transparent'}
			w={'50rem'}>
			<CardHeader>
				<Heading
					fontStyle={'normal'}
					fontSize={'1.65rem'}
					fontWeight={'700'}>
					Shipping Summary
				</Heading>
			</CardHeader>

			<CardBody>
				<Stack
					divider={<StackDivider borderColor={'gray.400'} />}
					spacing="4">
					<HStack>
						<Box flex={0.5}>
							<Heading
								size="sm"
								textTransform="uppercase"
								color="teal.500">
								Sender
							</Heading>
							<Text
								pt="2"
								fontSize="sm"
								color="gray.600"
								fontWeight={'600'}>
								{ltlShipmentInfo?.ship_from?.contact?.name} <br />
								{ltlShipmentInfo?.ship_from?.contact?.email} <br />
								{ltlShipmentInfo?.ship_from?.contact?.phone_number}
								<br />
								{ltlShipmentInfo?.ship_from?.address?.address_line1} <br />
								{ltlShipmentInfo?.ship_from?.address?.city_locality}, {ltlShipmentInfo?.ship_from?.address?.state_province} {ltlShipmentInfo?.ship_from?.address?.postal_code} <br />
								{swappedCountryCodeDictionary[ltlShipmentInfo?.ship_from?.address?.country_code]} <br />
							</Text>
						</Box>
						<Box flex={0.5}>
							<Heading
								size="sm"
								textTransform="uppercase"
								color="teal.500">
								Receiver
							</Heading>
							<Text
								pt="2"
								fontSize="sm"
								color="gray.600"
								fontWeight={'600'}>
								{ltlShipmentInfo?.ship_to?.contact?.name} <br />
								{ltlShipmentInfo?.ship_to?.contact?.email} <br />
								{ltlShipmentInfo?.ship_to?.contact?.phone_number}
								<br />
								{ltlShipmentInfo?.ship_to?.address?.address_line1} <br />
								{ltlShipmentInfo?.ship_to?.address?.city_locality}, {ltlShipmentInfo?.ship_to?.address?.state_province} {ltlShipmentInfo?.ship_to?.address?.postal_code} <br />
								{swappedCountryCodeDictionary[ltlShipmentInfo?.ship_to?.address?.country_code]} <br />
							</Text>
						</Box>
					</HStack>
					<Box>
						<Heading
							size="sm"
							textTransform="uppercase"
							color="teal.500">
							Packages Details
						</Heading>
						{ltlShipmentInfo?.packages.map((item, index) => (
							<Box
								key={index}
								color={'#0E1420'}>
								<Text
									pt="2"
									fontSize="sm"
									fontWeight="600">
									Package {index + 1}
								</Text>
								<Text fontSize="sm">Package Type: {item?.code}</Text>
								<Text fontSize="sm">
									Weight: {item?.weight?.value} {item?.weight?.unit}
								</Text>
								<Text fontSize="sm">
									Dimensions: {item.dimensions.length}x{item.dimensions.width}x{item.dimensions.height} {item.dimensions.unit}
								</Text>
							</Box>
						))}
					</Box>

					<Box>
						<Heading
							size="sm"
							textTransform="uppercase"
							color="teal.500">
							Cost details
						</Heading>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Shipping cost: {ltlShipmentCharges?.amount?.value} ({ltlShipmentCharges?.amount?.currency})
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Other costs: 0 (USD)
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Insurance: {insuranceDetails?.insurance_amount} (USD)
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Platform fee: {total_shipping_charge} (usd)
						</Text>
					</Box>
					<Box ml="auto">
						<Heading
							size="sm"
							textTransform="uppercase">
							Total: {total.toFixed(2)} (usd)
						</Heading>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default QuoteSummary;
