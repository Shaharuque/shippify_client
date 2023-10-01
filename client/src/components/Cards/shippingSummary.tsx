import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Text, Box, HStack } from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { countryCodeDictionary } from '../../data/countryCodeDictionary';
import { TPackageDetailsForm } from '../Basic shipment/multiStepperForBasic/packageDetailsForm';
import { ICustomsItem } from '../Basic shipment/multiStepperForBasic/customsInfoForm';

const returnPolicyDictionary = {
	treat_as_abandoned: 'Treat as abandoned',
	return_to_sender: 'Return to sender',
};

const ShippingSummary = () => {
	const sender = useAppSelector((state: RootState) => state?.basicShipments.ship_from);
	const receiver = useAppSelector((state: RootState) => state?.basicShipments.ship_to);
	const packages = useAppSelector((state: RootState) => state?.basicShipments.packages);
	const customs = useAppSelector((state: RootState) => state?.basicShipments?.customs);
	const selectedRate = useAppSelector((state: RootState) => state?.selectedRate?.selectedRate);
	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);

	const total = selectedRate?.shipping_amount?.amount + selectedRate?.other_amount?.amount + insuranceDetails?.insurance_amount;

	const swappedCountryCodeDictionary: { [key: string]: string } = {};
	for (const key in countryCodeDictionary) {
		const value = countryCodeDictionary[key];
		swappedCountryCodeDictionary[value] = key;
	}

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
								{sender.name} <br />
								{sender.phone} <br />
								{sender.company_name} <br />
								{sender.address_line1} <br />
								{sender.city_locality}, {sender.state_province} {sender.postal_code} <br />
								{swappedCountryCodeDictionary[sender.country_code]}
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
								{receiver.name} <br />
								{receiver.address_line1} <br />
								{receiver.city_locality}, {receiver.state_province} {receiver.postal_code} <br />
								{swappedCountryCodeDictionary[receiver.country_code]}
							</Text>
						</Box>
					</HStack>

					<HStack>
						<Box flex={0.5}>
							<Heading
								size="sm"
								textTransform="uppercase">
								Packages Details
							</Heading>
							{packages?.map((item: TPackageDetailsForm, index) => (
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

						{customs && customs?.contents.length > 0 ? (
							<Box
								flex={0.5}
								textTransform={'capitalize'}>
								<Heading
									size="sm"
									textTransform="uppercase">
									Customs Details
								</Heading>
								<Text fontSize="sm">Contents: {customs?.contents}</Text>
								<Text fontSize="sm">Return policy: {returnPolicyDictionary[customs?.non_delivery]}</Text>

								{customs?.customs_items?.map((item: ICustomsItem, index: number) => (
									<Box
										key={index}
										textTransform={'capitalize'}>
										<Text
											pt="2"
											fontSize="sm"
											fontWeight="600">
											Item {index + 1}
										</Text>
										<Text fontSize="sm">Description: {item?.description}</Text>
										<Text fontSize="sm">Origin country: {item?.country_of_origin}</Text>
										<Text fontSize="sm">Manufacturer country: {item?.country_of_manufacture}</Text>
										<Text fontSize="sm">Quantity: {item?.quantity}</Text>
										<Text fontSize="sm">
											Value: {item?.value?.amount} ({item?.value?.currency})
										</Text>
									</Box>
								))}
							</Box>
						) : null}
					</HStack>

					<Box>
						<Heading
							size="sm"
							textTransform="uppercase">
							Cost details
						</Heading>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Shipping cost: {selectedRate?.shipping_amount?.amount} ({selectedRate?.shipping_amount?.currency})
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Other costs: {selectedRate?.other_amount?.amount} ({selectedRate?.other_amount?.currency})
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Insurance: {insuranceDetails?.insurance_amount} (usd)
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

export default ShippingSummary;
