import { Box, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Select, Stack, useDisclosure, Text, RadioGroup, Radio, Input, Button } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchLTLOptionsQuery } from '../../../redux/api/ltlShipmentApi';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import BackButton from '../../Buttons/backButton';
import SubmitButton from '../../Buttons/submitButton';
import HazardousMaterialModal, { TLiableContact, defaultLiableContactValues } from '../../Modals/hazardousMaterialModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import 'react-calendar/dist/Calendar.css';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import CalendarModal from '../../Modals/calendarModal';

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
	options: [],
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
	const third_party = useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.bill_to);
	const dispatch = useAppDispatch();

	const token = localStorage.getItem('token');
	const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);
	const { handleSubmit, register, setValue } = useForm({ defaultValues: defaultServicesAndBillingDetailsFormLTL });

	//local states
	const [serviceOptions, setServiceOptions] = useState<any[]>([]);
	const [extraServices, setExtraServices] = useState<any[]>([]);
	const [liableContact, setLiableContact] = useState<TLiableContact>(defaultLiableContactValues);
	const [paymentTerms, setpaymentTerms] = useState('');
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());

	//modal hooks

	const hazardModal = useDisclosure();
	const calendarModal = useDisclosure();

	const onSubmit = (data: TServicesAndBillingDetailsFormLTL) => {
		data.bill_to.type = 'third_party';
		data.bill_to.payment_terms = paymentTerms;
		if (paymentTerms === 'prepaid') data.bill_to.contact = sender?.contact;
		else if (paymentTerms === 'collect') data.bill_to.contact = reciever?.contact;
		data.requested_by.company_name = reciever?.address?.company_name;
		data.requested_by.contact = reciever?.contact;
		let options: TOption[] = [];

		options = selectedOptions.map((code) => {
			if (code === 'haz') return { attributes: liableContact, code, name: 'Hazardous material' };
			else return { code };
		});

		data.options = options;
		data.pickup_date = selectedDate.toISOString().slice(0, 10);

		console.log('data:', data);
		dispatch(updateField(data));

		nextStep();
	};

	const handleExtraServicesChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (selectedOptions.includes(value)) return;
		else {
			if (value === 'haz' && event.target.checked) hazardModal.onOpen();
			setSelectedOptions((prev) => [...prev, value]);
		}
	};

	const handleLiabilityContactSave = (data: TLiableContact) => {
		setLiableContact(data);
	};

	useEffect(() => {
		if (paymentTerms === 'prepaid') setValue('bill_to.address', sender?.address);
		else if (paymentTerms === 'collect') setValue('bill_to.address', reciever?.address);
		else setValue('bill_to.address', third_party?.address);
	}, [paymentTerms]);

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
			<>
				<SpinningLoader />
			</>
		);
	}

	if (error) {
		return (
			<Box>
				<Error />
			</Box>
		);
	}

	return (
		<Box
			p={'.25vw'}
			w={'40rem'}
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
			<HazardousMaterialModal
				onClose={hazardModal.onClose}
				isOpen={hazardModal.isOpen}
				onSave={handleLiabilityContactSave}
			/>
			<CalendarModal
				isOpen={calendarModal.isOpen}
				onClose={calendarModal.onClose}
				onDateSelect={setSelectedDate}
				value={selectedDate}
			/>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap={'1rem'}
					align={'center'}>
					<FormControl
						id="service_code"
						isRequired
						w={'20rem'}>
						<FormLabel fontWeight={'600'}>Services:</FormLabel>
						<Select
							{...register('service_code')}
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}>
							{serviceOptions?.map((item: any, index: number) => (
								<option
									key={index}
									value={item.code}>
									{item.name}
								</option>
							))}
							{/* <option value={'gtd_am'}>Guaranteed morning</option>
							<option value={'gtd_noon'}>Guaranteed noon</option> */}
						</Select>
					</FormControl>
				</Flex>

				<FormControl
					mt={'1rem'}
					id="options">
					<FormLabel fontWeight={'600'}> Extra services:</FormLabel>
					<CheckboxGroup
						colorScheme="green"
						defaultValue={[]}>
						<Stack
							spacing={[1, 5]}
							direction={['column', 'row']}
							wrap={'wrap'}>
							{extraServices?.map((item, index: number) => (
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
				<Button
					bg={'cta'}
					p={'1vw'}
					mt={'2rem'}
					color={'primary'}
					_hover={{ backgroundColor: 'inherit', textColor: 'cta' }}
					onClick={calendarModal.onOpen}>
					Choose a Pickup date
				</Button>

				<FormControl style={{ display: 'flex', alignItems: 'center', marginTop: '4em' }}>
					<Text
						fontWeight={'600'}
						mr={'1rem'}>
						Billing method:
					</Text>
					<RadioGroup>
						<Stack
							spacing={4}
							direction="row">
							{billingMethod.map((item, index: number) => (
								<Radio
									borderColor={'#668bbd'}
									key={index}
									value={item.code}
									onChange={(e) => setpaymentTerms(e.target.value)}>
									{item.name}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
				</FormControl>
				{paymentTerms && paymentTerms.length > 0 ? (
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
				) : null}

				<Flex
					mt={'4rem'}
					justify={'flex-end'}
					gap={'1rem'}
					align={'center'}>
					<BackButton
						onClick={() => prevStep()}
						width={'8rem'}
					/>
					<SubmitButton
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
