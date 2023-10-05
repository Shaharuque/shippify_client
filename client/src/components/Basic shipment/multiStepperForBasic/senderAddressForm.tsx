import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Flex, Text, Select, Icon } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateField } from '../../../redux/features/basicShipmentsSlice';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { getAllWarehouses } from '../../../services/apis/setUpShipmentApi';
import { WarehouseSetupFormData } from '../../Registration and setup components/Warehouse setup form/warehouseSetupForm';
import { countryCodeDictionary } from '../../../data/countryCodeDictionary';
import { FiAlertTriangle } from 'react-icons/fi';

export type TSenderAddressFormData = {
	name: string;
	company_name: string;
	address_line1: string;
	city_locality: string;
	state_province: string;
	postal_code: string;
	country_code: string;
	phone: string;
};

export interface IUserFullDetails {
	address: {
		address_line1: string;
		address_line2: string;
		state_province: string;
		city_locality: string;
		postal_code: string;
		country_code: string;
	};
	companyEmail: string;
	companyName: string;
	createdAt: string;
	email: string;
	monthlyShipmentValue: string;
	name: string;
	password: string;
	selectedCarriers: any[];
	shipments: any[];
	updatedAt: string;
	__v: number;
	_id: string;
}

const swappedCountryCodeDictionary: { [key: string]: string } = {};
for (const key in countryCodeDictionary) {
	const value = countryCodeDictionary[key];
	swappedCountryCodeDictionary[value] = key;
}

const SenderAddressForm = ({ nextStep }: { nextStep: () => void }) => {
	const { handleSubmit, setValue, register } = useForm<TSenderAddressFormData>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.basicShipments?.ship_from),
		},
	});
	const dispatch = useAppDispatch();
	const [warehouseDataList, setWarehouseDataList] = useState<WarehouseSetupFormData[]>([]);
	const [warehouse, setWarehouse] = useState<WarehouseSetupFormData>();

	const onSubmit: SubmitHandler<TSenderAddressFormData> = (data) => {
		if (data && data.country_code) data.country_code = countryCodeDictionary[data.country_code];
		dispatch(updateField({ ship_from: data }));
		nextStep();
	};

	useEffect(() => {
		const fetchWarehouseData = async () => {
			const token: string | null = localStorage.getItem('token');
			try {
				const result = await getAllWarehouses(token as string);

				if (result?.data?.status === 'success') {
					const warehouses = result?.data?.data;
					setWarehouseDataList(warehouses);
					setWarehouse(warehouses[0]);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchWarehouseData();
	}, []);

	useEffect(() => {
		if (warehouse && warehouse?.warehouse_name.length > 0) {
			const userData = localStorage.getItem('userData');
			if (userData) {
				const user = JSON.parse(userData);
				setValue('name', user?.name);
				setValue('company_name', warehouse?.origin_address?.company_name || user?.companyName);
				setValue('address_line1', warehouse?.origin_address?.address_line1);
				setValue('city_locality', warehouse?.origin_address?.city_locality);
				setValue('state_province', warehouse?.origin_address?.state_province);
				setValue('postal_code', warehouse?.origin_address?.postal_code);
				setValue('country_code', swappedCountryCodeDictionary[warehouse?.origin_address?.country_code]);
			}
		}
	}, [warehouse]);

	const handleWarehouseSelection = (value: string) => {
		const result = warehouseDataList?.find((item) => item?.warehouse_name === value);
		setWarehouse(result);
	};

	return (
		<Box
			p=".25vw"
			width={'40rem'}
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
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Sender's Address
			</Text>

			<Select
				onChange={(e) => handleWarehouseSelection(e.target.value)}
				mt={'1rem'}
				w={'15vw'}
				placeholder="Select Address"
				value={warehouse?.warehouse_name}
				id="select_address"
				variant={'flushed'}
				borderBottom={'1px solid #314866'}
				transition={'all 0.30s ease-in-out;'}
				_focusVisible={{ borderColor: '#002855' }}>
				{warehouseDataList?.map((item: WarehouseSetupFormData, index: number) => (
					<option
						key={index}
						value={item.warehouse_name}>
						{item.warehouse_name}
					</option>
				))}
			</Select>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '4vh' }}>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="name">
						<FormLabel fontWeight={'600'}>Contact Name</FormLabel>

						<Input
							{...register('name')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>

					<FormControl id="company_name">
						<FormLabel fontWeight={'600'}>Company Name</FormLabel>

						<Input
							{...register('company_name')}
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
					<FormControl
						id="country_code"
						isReadOnly>
						<FormLabel fontWeight={'600'}>Country</FormLabel>
						<Input
							{...register('country_code')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>

					<FormControl id="state_province">
						<FormLabel fontWeight={'600'}>State/Province</FormLabel>

						<Input
							{...register('state_province')}
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
					<FormControl id="city_locality">
						<FormLabel fontWeight={'600'}>City</FormLabel>

						<Input
							{...register('city_locality')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl id="address_line1">
						<FormLabel fontWeight={'600'}>Street</FormLabel>

						<Input
							{...register('address_line1')}
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
					<FormControl id="postal_code">
						<FormLabel fontWeight={'600'}>Postal Code</FormLabel>

						<Input
							{...register('postal_code')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl
						id="phone"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							Phone
						</FormLabel>

						<Input
							{...register('phone')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
				</Flex>

				<Flex
					justifyContent={'flex-end'}
					mt={'10vh'}>
					<SubmitButton
						text="Save and Continue"
						width="12rem"
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default SenderAddressForm;
