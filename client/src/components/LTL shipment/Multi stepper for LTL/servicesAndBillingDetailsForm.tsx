import { Box, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Select, Stack, useDisclosure, Text, RadioGroup, Radio, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchLTLOptionsQuery } from '../../../redux/api/ltlShipmentApi';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';
import SubmitButton from '../../Buttons/submitButton';
import HazardousMaterialModal, { TLiableContact, defaultLiableContactValues } from '../../Modals/hazardousMaterialModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
// import './reactCalender.styles.css';

const billingMethod = [
	{ name: 'Prepaid', code: 'prepaid' },
	{ name: 'Collect', code: 'collect' },
	{ name: 'Third party', code: 'third_party' },
];

export interface TServicesAndBillingDetailsFormLTL {
	service_code: string;
	pickup_date: string;
	options: TOption[];
	bill_to: TBillingInfo;
	requested_by: TRequestedBy;
}

export type TOption = {
	code: string;
	name?: string;
	attributes?: {
		name: string;
		phone: string;
	};
};

export type TBillingInfo = {
	type: string;
	payment_terms: string;
	account: string;
	address: {
		company_name: string;
		address_line1: string;
		city_locality: string;
		state_province: string;
		postal_code: string;
		country_code: string;
	};
	contact: {
		name: string;
		phone_number: string;
		email: string;
	};
};

export type TRequestedBy = {
	company_name: string;
	contact: {
		name: string;
		phone_number: string;
		email: string;
	};
};

export const defaultServicesAndBillingDetailsFormLTL: TServicesAndBillingDetailsFormLTL = {
	service_code: 'gtd_am',
	pickup_date: '',
	options: [{ code: '' }],
	bill_to: {
		type: 'prepaid',
		payment_terms: 'prepaid',
		account: '123456',
		address: {
			company_name: '',
			address_line1: '',
			city_locality: '',
			state_province: '',
			postal_code: '',
			country_code: '',
		},
		contact: {
			name: '',
			phone_number: '',
			email: '',
		},
	},
	requested_by: {
		company_name: '',
		contact: {
			name: '',
			phone_number: '',
			email: '',
		},
	},
};

const ServicesAndBillingDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const sender = useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.ship_from);
	const reciever = useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.ship_to);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const token = localStorage.getItem('token');
	const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);
	const { handleSubmit, register, setValue } = useForm({ defaultValues: defaultServicesAndBillingDetailsFormLTL });

	//local states
	const [serviceOptions, setServiceOptions] = useState<any[]>([]);
	const [extraServices, setExtraServices] = useState<any[]>([]);
	const [liableContact, setLiableContact] = useState<TLiableContact>(defaultLiableContactValues);
	const [paymentType, setpaymentType] = useState('prepaid');
	const [options, setOptions] = useState<TOption[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());

	const dispatch = useAppDispatch();

	const onSubmit = (data: TServicesAndBillingDetailsFormLTL) => {
		data.bill_to.type = paymentType;
		data.bill_to.payment_terms = paymentType;
		if (paymentType === 'prepaid') data.bill_to.contact = sender?.contact;
		else if (paymentType === 'collect') data.bill_to.contact = reciever?.contact;
		data.requested_by.company_name = reciever?.address?.company_name;
		data.requested_by.contact = reciever?.contact;
		data.options = options;
		data.pickup_date = selectedDate.toISOString().slice(0, 10);

		console.log('data:', data);
		dispatch(updateField(data));
	};

	const handleExtraServicesChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const checked = event.target.checked;
		if (checked) {
			if (selectedOptions.includes(value)) return;
			if (value === 'haz') {
				onOpen();
			} else {
				setSelectedOptions((prev) => [...prev, value]);
				setOptions((prev) => [...prev, { code: value }]);
			}
		}
	};

	const handleLiabilityContactSave = (data: TLiableContact) => {
		setLiableContact(data);
		if (selectedOptions.includes('haz')) return;
		else setOptions((prev) => [...prev, { attributes: liableContact, code: 'haz', name: 'Hazardous material' }]);
	};

	useEffect(() => {
		if (fetchLTLOptions) {
			console.log('Data:', fetchLTLOptions);
			setExtraServices(fetchLTLOptions?.data?.options);
			setServiceOptions(fetchLTLOptions?.data?.services);
		}

		if (error) {
			console.error('Error fetching LTL rates:', error);
		}
	}, [fetchLTLOptions, error]);

	if (isLoading) {
		return (
			<Box>
				<SpinningLoader />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Error />
			</Box>
		);
	}

	useEffect(() => {
		if (paymentType === 'prepaid') setValue('bill_to.address', sender?.address);
		else if (paymentType === 'collect') setValue('bill_to.address', reciever?.address);
		else setValue('bill_to.address', defaultServicesAndBillingDetailsFormLTL?.bill_to?.address);
	}, [paymentType]);

	return (
		<Box
			p={'.25vw'}
			w={'45rem'}>
			<HazardousMaterialModal
				onClose={onClose}
				isOpen={isOpen}
				onSave={handleLiabilityContactSave}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap={'1rem'}
					align={'center'}>
					<FormControl
						id="service_code"
						isRequired
						w={'20rem'}>
						<FormLabel>Services:</FormLabel>
						<Select
							{...register('service_code')}
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}>
							{serviceOptions.map((item: any, index: number) => (
								<option
									key={index}
									value={item.code}>
									{item.name}
								</option>
							))}
							{/* <option value={'pkg'}>Package</option>
							<option value={'bag'}>Bag</option> */}
						</Select>
					</FormControl>
				</Flex>

				<FormControl
					mt={'1rem'}
					id="options">
					<FormLabel> Extra services:</FormLabel>
					<CheckboxGroup
						colorScheme="green"
						defaultValue={[]}>
						<Stack
							spacing={[1, 5]}
							direction={['column', 'row']}>
							{extraServices.map((item, index: number) => (
								<Checkbox
									borderColor={'#668bbd'}
									whiteSpace={'nowrap'}
									key={index}
									value={item.code}
									onChange={(e) => handleExtraServicesChange(e)}>
									{item.name}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
				</FormControl>
				<FormControl
					mt={'1rem'}
					id="pickup_date"
					isRequired
					style={{ display: 'flex', alignItems: 'center' }}>
					<FormLabel>Pickup Date</FormLabel>

					<Calendar
						onChange={setSelectedDate}
						value={selectedDate}
					/>
				</FormControl>

				<FormControl style={{ display: 'flex', alignItems: 'center', marginTop: '4em' }}>
					<Text
						fontWeight={'600'}
						mr={'1rem'}>
						Billing method:
					</Text>
					<RadioGroup defaultValue={billingMethod[0].code}>
						<Stack
							spacing={4}
							direction="row">
							{billingMethod.map((item, index: number) => (
								<Radio
									borderColor={'#668bbd'}
									key={index}
									value={item.code}
									onChange={(e) => setpaymentType(e.target.value)}>
									{item.name}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
				</FormControl>

				<Box>
					<Flex
						mt={'1.5rem'}
						gap={'3rem'}
						mb={'3vh'}>
						<FormControl id="bill_to.address.company_name">
							<FormLabel fontWeight={'600'}>Company Name</FormLabel>
							<Input
								{...register('bill_to.address.company_name')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
						<FormControl id="bill_to.address.address_line1">
							<FormLabel fontWeight={'600'}>Street</FormLabel>

							<Input
								{...register('bill_to.address.address_line1')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
					</Flex>

					<Flex
						gap={'3rem'}
						mb={'3vh'}>
						<FormControl id="bill_to.address.state_province">
							<FormLabel fontWeight={'600'}>State/Province</FormLabel>

							<Input
								{...register('bill_to.address.state_province')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
						<FormControl id="bill_to.address.city_locality">
							<FormLabel fontWeight={'600'}>City</FormLabel>

							<Input
								{...register('bill_to.address.city_locality')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
					</Flex>
					<Flex gap={'3rem'}>
						<FormControl id="bill_to.address.country_code">
							<FormLabel fontWeight={'600'}>Country</FormLabel>

							<Select
								{...register('bill_to.address.country_code')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855' }}>
								<option value={'US'}>United State of America</option>
								<option value={'CA'}>Canada</option>
								<option value={'MX'}>Mexico</option>
								<option value={'AU'}>Australia</option>
							</Select>
						</FormControl>
						<FormControl id="bill_to.address.postal_code">
							<FormLabel fontWeight={'600'}>Postal Code</FormLabel>

							<Input
								{...register('bill_to.address.postal_code')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
					</Flex>
				</Box>
				<Flex
					mt={'2rem'}
					gap={'1rem'}
					justify={'flex-end'}>
					<SubmitButton
						text="Save Details"
						width="12rem"
					/>
					<BackButton
						onClick={() => prevStep()}
						width={'6rem'}
					/>
					<RegularButton
						onClick={() => nextStep()}
						text="Continue"
						width="12rem"
						// isDisabled={true}
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default ServicesAndBillingDetailsForm;
