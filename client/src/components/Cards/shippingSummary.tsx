import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Text, Box, HStack } from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { countryCodeDictionary } from '../../data/countryCodeDictionary';

const ShippingSummary = () => {
	const sender = useAppSelector((state: RootState) => state.shipments.ship_from);
	const receiver = useAppSelector((state: RootState) => state.shipments.ship_to);
	const packages = useAppSelector((state: RootState) => state.shipments.packages);
	const customs = useAppSelector((state: RootState) => state.shipments?.customs);

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
								{sender.company_name} <br />
								{sender.address_line1} <br />
								{sender.city_locality}, {sender.state_province} {sender.postal_code} <br />
								{swappedCountryCodeDictionary[sender.country_code]} <br />
								Phone: {sender.phone}
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
					<Box>
						<Heading
							size="sm"
							textTransform="uppercase">
							Packages Details
						</Heading>
						{packages.map((item, index) => (
							<Box key={index}>
								<Text
									pt="2"
									fontSize="sm"
									fontWeight="600">
									Package {index + 1}
								</Text>
								<Text fontSize="sm">
									Weight: {item.weight.value} {item.weight.unit}
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
							textTransform="uppercase">
							Cost details
						</Heading>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Shipping cost:
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Other costs:
						</Text>
						<Text
							fontSize="sm"
							m={'.2rem 0'}>
							Insurance:
						</Text>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default ShippingSummary;
