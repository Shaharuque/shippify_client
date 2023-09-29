import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Icon, Input, ListItem, NumberInput, NumberInputField, Text, UnorderedList } from '@chakra-ui/react';
import { HiCurrencyDollar } from 'react-icons/hi';
import BackButton from '../../Buttons/backButton';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import RegularButton from '../../Buttons/regularButton';
import axios from 'axios';

const InsuranceDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const selectedRate = useAppSelector((state: RootState) => state?.selectedRate?.selectedRate);
	const shipmentId = useAppSelector((state: RootState) => state?.selectedRate?.shipmentId);

	const [insurance, setInsurance] = useState(0);
	const [productValue, setProductValue] = useState(0);
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const previousProductValue = useAppSelector((state: RootState) => state.basicShipments);

	const handleProductValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.floor(Number(event.target.value));
		setProductValue(value);
		setInsurance(value);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAgreedToTerms(event.target.checked);
	};

	const handlePurchaseInsurance = () => {
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
				const response = await axios.patch('http://192.168.26.1:5000/shipment/select-rates', payload, {
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
			gap={'1rem'}
			p={'1vw'}
			h={'87vh'}
			overflowY={'auto'}
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
						h={'4vh'}
						border={'1px solid'}
						_focusVisible={{ boxShadow: '0 0 0 1px #002855', borderColor: '#002855' }}
					/>
				</NumberInput>
			</FormControl>

			{/* <Input
				type="number"
				value={productValue}
				onChange={handleProductValueChange}
				textAlign="center"
				w={'10rem'}
				h={'4vh'}
				alignSelf={'center'}
				border={'1px solid'}
				_focusVisible={{ boxShadow: '0 0 0 1px #002855', borderColor: '#002855', zIndex: 1 }}
			/> */}

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
				gap={'.5rem'}>
				<Icon
					as={HiCurrencyDollar}
					boxSize={'3rem'}
				/>
				<Text
					fontWeight={'700'}
					fontSize={'2.5rem'}>
					{0.1 * insurance}
				</Text>
			</Flex>

			<Checkbox
				colorScheme="green"
				size={'lg'}
				alignItems={'center'}
				fontWeight={'500'}
				onChange={handleCheckboxChange}>
				I agree to the
				<Text
					as="span"
					color="blue.500"
					ml={'.2rem'}>
					Terms and Conditions
				</Text>
			</Checkbox>

			<Box
				h={'20rem'}
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
					<Heading fontSize={'1.35rem'}>Terms and Conditions</Heading>
					<ListItem m={'.5rem 0'}>
						<Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
					</ListItem>
				</UnorderedList>
			</Box>
			<Flex
				mt={'2.5rem'}
				justify={'space-between'}>
				<BackButton
					onClick={() => prevStep()}
					width="6rem"></BackButton>
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
						isDisabled={productValue === 0}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default InsuranceDetailsForm;
