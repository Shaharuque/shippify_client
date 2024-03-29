import { Box, Button, Checkbox, Flex, HStack, Heading, Icon, ListItem, NumberInput, NumberInputField, Text, UnorderedList } from '@chakra-ui/react';
import { HiCurrencyDollar } from 'react-icons/hi';
import BackButton from '../../Buttons/backButton';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import RegularButton from '../../Buttons/regularButton';
import axios from 'axios';
import { insuranceTermsAndConditions } from '../../../data/inSuranceTerms';
import { updateInsurance } from '../../../redux/features/insuranceSlice';
import { useFetchQuoteMutation } from '../../../redux/api/ltlShipmentApi';
import { updateLTLTotalCharge } from '../../../redux/features/ltlTotalChargeSlice';
import addCommaToMonetaryValue from '../../../utils/addCommatoMonetaryValues';
import Error from '../../Error bad request/error';

const InsuranceDetailsFormLTL = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const dispatch = useAppDispatch();
	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);
	const ltlShipmentInfo = useAppSelector((state: RootState) => state.ltlShipments);
	const [fetchQuote] = useFetchQuoteMutation();

	const [insuranceFee, setInsuranceFee] = useState(insuranceDetails?.insurance_amount || 0);
	const [productValue, setProductValue] = useState(0);
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [shipmentId, setShipmentId] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('shipment', ltlShipmentInfo);

		const fetchData = async () => {
			try {
				const response = await fetchQuote({ data: ltlShipmentInfo, token });
				console.log('response:', response);
				if (response?.data?.status === 'success') {
					console.log('response:', response?.data?.data?._id)
					setShipmentId(response?.data?.data?._id);
					localStorage.setItem('shipmentId', response?.data?.data?._id);
					dispatch(updateLTLTotalCharge({ amount: response?.data?.data?.shipment_detail?.charges[4]?.amount, shipmentId: response?.data?.data?._id }));
					localStorage.setItem('quoteId', response?.data?.data?.shipment_detail?.quote_id);
				}
			} catch (error) {
				console.error(error);
				setError(true);
			}
		};

		fetchData();
	}, [ltlShipmentInfo, fetchQuote]);

	const handleCheckInsurance = async () => {
		const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
		try {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			const response = await axios.post(
				`${BASE_URL}/ltlShipment/calculate-ltlinsurance/${shipmentId}`,
				{ amount: productValue },
				{
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				}
			);

			if (response?.data?.status === 'success') setInsuranceFee(response?.data?.data?.fee?.amount);
			setIsLoading(false);
		} catch (error) {
			console.error('Error while fetching insurance rate:', error);
		}
	};

	const handleProductValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.floor(Number(event.target.value));
		setProductValue(value);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAgreedToTerms(event.target.checked);
	};

	const handlePurchaseInsurance = () => {
		dispatch(updateInsurance({ already_purchased: false, product_value: productValue, insurance_amount: insuranceFee, terms_and_conditions: agreedToTerms }));
		nextStep();
	};

	const handleAlreadyPurchased = () => {
		dispatch(
			updateInsurance({
				already_purchased: true,
				product_value: 0,
				insurance_amount: 0,
				terms_and_conditions: false,
			})
		);
		nextStep();
	};

	const isButtonDisabled = insuranceFee <= 0 || !agreedToTerms;

	return (
		<>
			{error ? (
				<Flex
					h={'80vh'}
					justify={'center'}
					align={'center'}>
					<Error />
				</Flex>
			) : (
				<Flex
					direction={'column'}
					w={'40rem'}
					gap={'.5rem'}
					h={'75vh'}
					overflowY={'scroll'}>
					<Heading
						fontSize={'1.5rem'}
						textAlign={'center'}
						fontFamily={'Inter'}>
						Insure your products
					</Heading>

					<Flex
						mt={'2rem'}
						align={'center'}
						justify={'center'}
						gap={'1rem'}>
						<NumberInput>
							<NumberInputField
								value={productValue}
								onChange={handleProductValueChange}
								placeholder="Product Value"
								textAlign="center"
								w={'12rem'}
								h={'5vh'}
								fontSize={'1.15rem'}
								border={'1px solid'}
								_focusVisible={{ boxShadow: '0 0 0 1px #002855', borderColor: '#002855' }}
							/>
						</NumberInput>

						<Button
							isDisabled={!productValue || productValue <= 0}
							onClick={handleCheckInsurance}
							isLoading={isLoading}
							loadingText="Getting best rates...">
							Check Fee
						</Button>
					</Flex>

					<Text
						mt={'.75rem'}
						fontWeight={'600'}
						fontSize={'1.2rem'}
						textAlign={'center'}>
						Insurance fee
					</Text>
					<Flex
						align={'center'}
						justify={'center'}
						mb={'1rem'}>
						<Icon
							as={HiCurrencyDollar}
							boxSize={'2rem'}
						/>
						<Text
							fontWeight={'700'}
							fontSize={'1.5rem'}>
							{addCommaToMonetaryValue(insuranceFee)}
						</Text>
					</Flex>

					<Checkbox
						colorScheme="green"
						size={'md'}
						alignItems={'center'}
						fontWeight={'500'}
						onChange={handleCheckboxChange}>
						<HStack fontSize={'1rem'}>
							<Text>I agree to the</Text>
							<Text
								as="span"
								color="blue.500">
								Terms and Conditions
							</Text>
						</HStack>
					</Checkbox>

					<Box
						w={'100%'}
						overflowY={'scroll'}
						p={'1vw'}
						border={'1px solid #fff'}
						borderRadius={'.5rem'}
						css={{
							'&::-webkit-scrollbar': {
								width: '0',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								borderRadius: '0.25em',
							},
						}}
						_hover={{ borderColor: '#002855', boxShadow: '0px 0px 3px  #002855 ' }}>
						<UnorderedList>
							<Heading fontSize={'1.3rem'}>Terms and Conditions</Heading>
							<Text
								mt={'.25rem'}
								px={'.75rem'}>
								In consideration of the mutual promises contained in this Agreement, and intending to be legally bound, pursuant to Section 252 of the Act, Frontier and Onvoy hereby agree as follows:
							</Text>

							{insuranceTermsAndConditions?.map((policy: { title: string; description: string }, index: number) => (
								<ListItem
									m={'.5rem 0'}
									key={index}>
									<Text
										as="b"
										mr={'.25rem'}>
										{policy.title}:
									</Text>
									{policy.description}
								</ListItem>
							))}
						</UnorderedList>
					</Box>
					<Flex
						mt={'3rem'}
						justify={'space-between'}>
						<BackButton
							onClick={() => prevStep()}
							width="8rem"></BackButton>
						<Flex gap={'1rem'}>
							<Button
								onClick={handleAlreadyPurchased}
								w={'10rem'}
								borderRadius={'2rem'}
								p={'1rem'}>
								Already insured
							</Button>

							<RegularButton
								onClick={handlePurchaseInsurance}
								text="Purchase insurance"
								width="12rem"
								isDisabled={isButtonDisabled}
							/>
						</Flex>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default InsuranceDetailsFormLTL;
