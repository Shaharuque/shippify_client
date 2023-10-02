import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Flex, Text, Select } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import { updateField } from '../../../redux/features/basicShipmentsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

export type TReceiverAddressFormData = {
	name: string;
	address_line1: string;
	city_locality: string;
	state_province: string;
	postal_code: string;
	country_code: string;
};

const ReceiverAddressForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const dispatch = useAppDispatch();

	const { handleSubmit, register, setValue } = useForm<TReceiverAddressFormData>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.basicShipments?.ship_to),
		},
	});

	const [countries, setCountries] = useState<any>({});
	const [cities, setCities] = useState<any[]>([]);

	const onSubmit: SubmitHandler<TReceiverAddressFormData> = (data) => {
		dispatch(updateField({ ship_to: data }));
		nextStep();
	};

	const BACKEND_FULL_URL = `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

	useEffect(() => {
		const fetchCityData = async () => {
			try {
				const response = await axios.get(`${BACKEND_FULL_URL}/get/countrywise/city/info/get`);

				if (response?.data?.success) {
					setCountries(response?.data?.result[0]);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchCityData();
	}, []);

	const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const result = countries?.city?.find((item: any) => item.value === value);
		setCities(result?.citys);
	};

	const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const value = event.target.value;
		const result = cities?.find((item) => item.city === value);

		setValue('postal_code', result?.postalcode || '');
	};

	return (
		<Box
			p="2vw"
			width={'40rem'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Receiver's Address
			</Text>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '2.5rem' }}>
				<Flex
					gap={'3rem'}
					mb={'2vw'}>
					<FormControl id="name">
						<FormLabel fontWeight={'600'}>Name</FormLabel>
						<Input
							{...register('name')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl
						id="country_code"
						mb="4">
						<FormLabel fontWeight={'600'}>Country</FormLabel>
						<Select
							{...register('country_code')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855' }}
							placeholder="Select country">
							<option value={'US'}>United State of America</option>
							<option value={'CA'}>Canada</option>
							<option value={'MX'}>Mexico</option>
							<option value={'AU'}>Australia</option>
						</Select>
					</FormControl>
				</Flex>

				<Flex
					gap={'3rem'}
					mb={'2vw'}>
					<FormControl
						id="state_province"
						mb="4">
						<FormLabel fontWeight={'600'}>State/Province</FormLabel>
						<Select
							{...register('state_province')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							placeholder="Select state"
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							onChange={handleStateChange}>
							{countries?.city?.map((state: any, index: number) => (
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
						mb="4">
						<FormLabel fontWeight={'600'}>City</FormLabel>
						<Select
							{...register('city_locality')}
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
				<Flex
					gap={'3rem'}
					mb={'2vw'}>
					<FormControl
						id="address_line1"
						mb="4">
						<FormLabel fontWeight={'600'}>Street Address</FormLabel>
						<Input
							{...register('address_line1')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>

					<FormControl
						id="postal_code"
						mb="4">
						<FormLabel fontWeight={'600'}>Postal Code</FormLabel>

						<Input
							{...register('postal_code')}
							isReadOnly
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
				</Flex>

				<Flex
					justifyContent={'flex-end'}
					gap={'1rem'}
					mt={'5rem'}>
					<BackButton
						onClick={prevStep}
						width="8rem"
					/>
					<SubmitButton
						text="Save and Continue"
						width="12rem"
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default ReceiverAddressForm;
