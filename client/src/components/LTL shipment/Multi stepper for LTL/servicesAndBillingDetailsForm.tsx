import { Box, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Select, Stack, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchLTLOptionsQuery } from '../../../redux/api/ltlShipmentApi';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';
import SubmitButton from '../../Buttons/submitButton';
import HazardousMaterialModal from '../../Modals/hazardousMaterialModal';

export interface TServicesAndBillingDetailsFormLTL {
	service_code: string;
	pickup_date: string;
	options: TOption[];
	bill_to: TBillingInfo;
	requested_by: TRequestedBy;
	shipment_measurements: TShipmentMeasurements;
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

export type TShipmentMeasurements = {
	total_linear_length: {
		value: number;
		unit: string;
	};
	total_width: {
		value: number;
		unit: string;
	};
	total_height: {
		value: number;
		unit: string;
	};
	total_weight: {
		value: number;
		unit: string;
	};
};

export const defaultServicesAndBillingDetailsFormLTL: TServicesAndBillingDetailsFormLTL = {
	service_code: 'stnd',
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
	shipment_measurements: {
		total_linear_length: {
			value: 1200,
			unit: 'inches',
		},
		total_width: {
			value: 1000,
			unit: 'inches',
		},
		total_height: {
			value: 1000,
			unit: 'inches',
		},
		total_weight: {
			value: 1000,
			unit: 'pounds',
		},
	},
};

const ServicesAndBillingDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const token = localStorage.getItem('token');
	const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);
	const { handleSubmit, register, setValue } = useForm({ defaultValues: defaultServicesAndBillingDetailsFormLTL });
	const [serviceOptions, setServiceOptions] = useState<any[]>([]);
	const [extraServices, setExtraServices] = useState<any[]>([]);

	const onSubmit = (data: TServicesAndBillingDetailsFormLTL) => {
		console.log('data:', data);
	};
	const handleExtraServicesChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const checked = event.target.checked;
		if (value === 'haz' && checked) {
			onOpen();
		}
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

	return (
		<Box
			p={'.25vw'}
			w={'45rem'}>
			<HazardousMaterialModal
				onClose={onClose}
				isOpen={isOpen}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap={'1rem'}
					align={'center'}>
					<FormControl
						isRequired
						w={'20rem'}>
						<FormLabel>Services:</FormLabel>
						<Select
							{...register('service_code')}
							defaultValue={'pkg'}
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

				<FormControl mt={'1rem'}>
					<FormLabel> Extra services</FormLabel>
					<CheckboxGroup
						colorScheme="green"
						defaultValue={[]}>
						<Stack
							spacing={[1, 5]}
							direction={['column', 'row']}>
							{extraServices.map((item, index: number) => (
								<Checkbox
									{...register('options')}
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
						isDisabled={true}
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default ServicesAndBillingDetailsForm;
