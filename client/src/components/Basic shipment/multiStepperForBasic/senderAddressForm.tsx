import { useForm, SubmitHandler, Controller, PathString } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Flex, Text, Select } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateField } from '../../../redux/features/basicShipmentsSlice';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { profile } from '../../../services/apis/authApi';

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

interface User {
	address: {
		address_line1: string;
		address_line2: string;
		state_province: string;
		city_locality: string;
		postal_code: string;
		country_code: PathString;
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

const SenderAddressForm = ({ nextStep }: { nextStep: () => void }) => {
	const { control, handleSubmit, setValue } = useForm<TSenderAddressFormData>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.basicShipments?.ship_from),
		},
	});
	const dispatch = useAppDispatch();
	const [userData, setUserData] = useState<User>();

	const onSubmit: SubmitHandler<TSenderAddressFormData> = (data) => {
		dispatch(updateField({ ship_from: data }));
		nextStep();
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchUserData = async () => {
			try {
				const result = await profile(token as string);

				setUserData(result?.data?.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	useEffect(() => {
		if (userData && userData?.name.length > 0) {
			setValue('name', userData?.name);
			setValue('company_name', userData?.companyName);
			setValue('address_line1', userData?.address?.address_line1);
			setValue('city_locality', userData?.address?.city_locality);
			setValue('state_province', userData?.address?.state_province);
			setValue('postal_code', userData?.address?.postal_code);
			setValue('country_code', userData?.address?.country_code);
		}
	}, [userData]);

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
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '4vh' }}>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="name">
						<FormLabel fontWeight={'600'}>Contact Name</FormLabel>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>

					<FormControl id="company_name">
						<FormLabel fontWeight={'600'}>Company Name</FormLabel>
						<Controller
							name="company_name"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>
				</Flex>

				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="address_line1">
						<FormLabel fontWeight={'600'}>Street</FormLabel>
						<Controller
							name="address_line1"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>

					<FormControl id="city_locality">
						<FormLabel fontWeight={'600'}>City</FormLabel>
						<Controller
							name="city_locality"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>
				</Flex>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="state_province">
						<FormLabel fontWeight={'600'}>State/Province</FormLabel>
						<Controller
							name="state_province"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>

					<FormControl id="postal_code">
						<FormLabel fontWeight={'600'}>Postal Code</FormLabel>
						<Controller
							name="postal_code"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
						/>
					</FormControl>
				</Flex>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="country_code">
						<FormLabel fontWeight={'600'}>Country</FormLabel>
						<Controller
							name="country_code"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855' }}>
									<option value={'US'}>United State of America</option>
									<option value={'CA'}>Canada</option>
									<option value={'MX'}>Mexico</option>
									<option value={'AU'}>Australia</option>
								</Select>
							)}
						/>
					</FormControl>

					<FormControl id="phone">
						<FormLabel fontWeight={'600'}>Phone</FormLabel>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									variant={'flushed'}
									borderBottom={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
								/>
							)}
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
