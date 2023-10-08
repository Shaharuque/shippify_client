import { Flex, FormControl, FormLabel, Input, Select, Box, Text } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect, ChangeEvent } from 'react';

export type TRecieverAddressFormDataLTL = {
	contact: {
		name: string;
		email: string;
		phone_number: string;
	};
	address: {
		company_name: string;
		address_line1: string;
		city_locality: string;
		state_province: string;
		postal_code: string;
		country_code: string;
	};
};

const RecieverAddressFormLTL = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const dispatch = useAppDispatch();
	const { handleSubmit, register, setValue } = useForm<TRecieverAddressFormDataLTL>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.ship_to),
		},
	});

	const [countries, setCountries] = useState<any[]>([]);
	const [states, setStates] = useState<any[]>([]);
	const [cities, setCities] = useState<any[]>([]);

	const onSubmit: SubmitHandler<TRecieverAddressFormDataLTL> = (data) => {
		dispatch(updateField({ ship_to: data }));
		nextStep();
	};

	const BACKEND_FULL_URL = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

	useEffect(() => {
		const fetchCityData = async () => {
			try {
				const response = await axios.get(`${BACKEND_FULL_URL}/get/countrywise/city/info/get`);

				if (response?.data?.success) {
					setCountries(response?.data?.result);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchCityData();
	}, []);

	const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const result = countries?.find((item: any) => item.value === value);

		setStates(result?.city);
	};

	const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const result = states.find((item: any) => item.value === value);
		setCities(result?.citys);
	};

	const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const result = cities?.find((item) => item.city === value);

		setValue('address.postal_code', result?.postalcode?.replace(/\s/g, '') || '');
	};

	return (
		<Box
			p=".25vw"
			width={'40rem'}
			// h={'87vh'}
			overflowY={'scroll'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Dropoff Address
			</Text>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '4vh' }}>
				<Box className="  p-1 rounded  mb-8 ">
					<Flex
						gap={'3rem'}
						mb={'3vh'}>
						<FormControl
							id="contact.name"
							isRequired>
							<FormLabel
								fontWeight={'600'}
								requiredIndicator={<></>}>
								Contact Name
							</FormLabel>
							<Input
								{...register('contact.name')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>

						<FormControl
							id="contact.email"
							isRequired>
							<FormLabel
								fontWeight={'600'}
								requiredIndicator={<></>}>
								Contact Email
							</FormLabel>
							<Input
								{...register('contact.email')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
					</Flex>
					<Flex w={'15vw'}>
						<FormControl
							id="contact.phone_number"
							isRequired>
							<FormLabel
								fontWeight={'600'}
								requiredIndicator={<></>}>
								Contact Number
							</FormLabel>
							<Input
								{...register('contact.phone_number')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>
					</Flex>
				</Box>

				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl
						id="address.company_name"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							Company Name
						</FormLabel>
						<Input
							{...register('address.company_name')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl
						id="address.country_code"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							Country
						</FormLabel>
						<Select
							{...register('address.country_code')}
							onChange={handleCountryChange}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855' }}>
							<option value={'US'}>United State of America</option>
							<option value={'CA'}>Canada</option>
							{/* <option value={'MX'}>Mexico</option>
							<option value={'AU'}>Australia</option> */}
						</Select>
					</FormControl>
				</Flex>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl
						id="state_province"
						mb="4"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							State/Province
						</FormLabel>
						<Select
							{...register('address.state_province')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							placeholder="Select state"
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							onChange={handleStateChange}>
							{states?.map((state: any, index: number) => (
								<option
									key={index}
									value={state?.value}>
									{state?.city}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl
						id="city_locality"
						mb="4"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							City
						</FormLabel>
						<Select
							{...register('address.city_locality')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							placeholder="Select city"
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							onChange={handleCityChange}>
							{cities?.map((item, index) => (
								<option
									key={index}
									value={item.value}>
									{item.city}
								</option>
							))}
						</Select>
					</FormControl>
				</Flex>
				<Flex gap={'3rem'}>
					<FormControl
						id="address.address_line1"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							Street
						</FormLabel>
						<Input
							{...register('address.address_line1')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>

					<FormControl
						id="address.postal_code"
						isRequired>
						<FormLabel
							fontWeight={'600'}
							requiredIndicator={<></>}>
							Postal Code
						</FormLabel>
						<Input
							{...register('address.postal_code')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
				</Flex>

				<Flex
					justifyContent={'flex-end'}
					mt={'10vh'}
					gap={'1rem'}>
					<BackButton
						onClick={() => prevStep()}
						width="8rem"></BackButton>
					<SubmitButton
						text="Save and Continue"
						width="12rem"
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default RecieverAddressFormLTL;
