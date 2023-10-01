import { Box, Button, Checkbox, Flex, FormControl, FormLabel, HStack, Heading, Icon, ListItem, NumberInput, NumberInputField, Text, UnorderedList } from '@chakra-ui/react';
import { HiCurrencyDollar } from 'react-icons/hi';
import BackButton from '../../Buttons/backButton';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import RegularButton from '../../Buttons/regularButton';
import axios from 'axios';
import { insuranceTermsAndConditions } from '../../../data/inSuranceTerms';
import { updateInsurance } from '../../../redux/features/insuranceSlice';

const InsuranceDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const selectedRate = useAppSelector((state: RootState) => state?.selectedRate?.selectedRate);

	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);
	const shipmentId = useAppSelector((state: RootState) => state?.selectedRate?.shipmentId);

	const dispatch = useAppDispatch();

	const [insurance, setInsurance] = useState(insuranceDetails?.insurance_amount * 50);
	const [productValue, setProductValue] = useState(insuranceDetails?.insurance_amount);
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const previousProductValue = useAppSelector((state: RootState) => state.basicShipments);

	const handleProductValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.floor(Number(event.target.value));
		setProductValue(value);
		setInsurance(value);

		try {
			const token = localStorage.getItem('token');
			const response = await axios.post(
				` http://192.168.68.76:5000/shipment/calculate-insurance/${shipmentId}`,
				{ amount: value },
				{
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				}
			);

			console.log('response from insurance: ', response?.data);
		} catch (error) {
			console.error('Error while fetching insurance rate:', error);
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAgreedToTerms(event.target.checked);
	};

	const handlePurchaseInsurance = () => {
		dispatch(updateInsurance({ already_insured: false, product_value: productValue, insurance_amount: insurance * 0.02, terms_and_conditions: agreedToTerms }));
		nextStep();
	};

	const isButtonDisabled = productValue <= 0 || !agreedToTerms;

	useEffect(() => {
		if (previousProductValue?.customs) {
			const customItems = previousProductValue?.customs?.customs_items;
			const totalValue = customItems.reduce((accumulator, item) => accumulator + item.quantity * item.value?.amount, 0);

			setProductValue(totalValue);
			setInsurance(totalValue);
		}
	}, [previousProductValue]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const postSelectedRateAndShipmentId = async () => {
			try {
				const payload = { shipmentId, selectedRate };
				const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/shipment/select-rates`, payload, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});
				console.log('response:', response?.data);
			} catch (error) {
				console.error('Error while posting data', error);
			}
		};
		postSelectedRateAndShipmentId();
	}, [shipmentId, selectedRate]);

	return (
		<Flex
			direction={'column'}
			w={'40rem'}
			gap={'.5rem'}
			h={'75vh'}
			overflowY={'scroll'}
			css={{
				'&::-webkit-scrollbar': {
					width: '0',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderRadius: '0.25em',
				},
			}}>
			<Heading
				fontSize={'1.5rem'}
				textAlign={'center'}
				fontFamily={'Inter'}>
				Insure your products
			</Heading>

			<FormControl
				mt={'.75rem'}
				alignItems={'center'}
				display={'flex'}
				flexDirection={'column'}>
				<FormLabel
					fontWeight={'600'}
					fontSize={'1.2rem'}
					textAlign={'center'}
					whiteSpace={'nowrap'}>
					Product value
				</FormLabel>
				<NumberInput>
					<NumberInputField
						value={productValue}
						onChange={handleProductValueChange}
						textAlign="center"
						w={'10rem'}
						h={'5vh'}
						border={'1px solid'}
						_focusVisible={{ boxShadow: '0 0 0 1px #002855', borderColor: '#002855' }}
					/>
				</NumberInput>
			</FormControl>

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
				gap={'.5rem'}
				mb={'1rem'}>
				<Icon
					as={HiCurrencyDollar}
					boxSize={'3rem'}
				/>
				<Text
					fontWeight={'700'}
					fontSize={'2.5rem'}>
					{0.02 * insurance}
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
						onClick={() => nextStep()}
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
	);
};

export default InsuranceDetailsForm;
