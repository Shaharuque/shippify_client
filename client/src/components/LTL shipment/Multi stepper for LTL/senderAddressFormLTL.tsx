import { Flex, FormControl, FormLabel, Input, Select, Box, Text } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../../Buttons/submitButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import { useEffect, useState } from 'react';
import { IUserFullDetails } from '../../Basic shipment/multiStepperForBasic/senderAddressForm';
import { profile } from '../../../services/apis/authApi';

export type TSenderAddressFormDataLTL = {
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

const SenderAddressFormLTL = ({ nextStep }: { nextStep: () => void }) => {
	const dispatch = useAppDispatch();
	const { control, handleSubmit, setValue } = useForm<TSenderAddressFormDataLTL>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.ship_from),
		},
	});

	const [userData, setUserData] = useState<IUserFullDetails>();

	const onSubmit: SubmitHandler<TSenderAddressFormDataLTL> = (data) => {
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
			setValue('contact.name', userData?.name);
			setValue('contact.email', userData?.email);
			setValue('address.company_name', userData?.companyName);
			setValue('address.address_line1', userData?.address?.address_line1);
			setValue('address.city_locality', userData?.address?.city_locality);
			setValue('address.state_province', userData?.address?.state_province);
			setValue('address.postal_code', userData?.address?.postal_code);
			setValue('address.country_code', userData?.address?.country_code);
		}
	}, [userData]);

	return (
		<Box
			p=".25vw"
			width={'40rem'}
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
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Sender's Address
			</Text>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '4vh' }}>
				<Box className="  p-1 rounded  mb-8 ">
					<Flex
						gap={'3rem'}
						mb={'3vh'}>
						<FormControl id="contact.name">
							<FormLabel fontWeight={'600'}>Contact Name</FormLabel>
							<Controller
								name="contact.name"
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

						<FormControl id="contact.email">
							<FormLabel fontWeight={'600'}>Contact Email</FormLabel>
							<Controller
								name="contact.email"
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
					<Flex w={'20vw'}>
						<FormControl id="contact.phone_number">
							<FormLabel fontWeight={'600'}>Contact Number</FormLabel>
							<Controller
								name="contact.phone_number"
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
				</Box>

				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="address.address_line1">
						<FormLabel fontWeight={'600'}>Street</FormLabel>
						<Controller
							name="address.address_line1"
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
					<FormControl id="address.company_name">
						<FormLabel fontWeight={'600'}>Company Name</FormLabel>
						<Controller
							name="address.company_name"
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
					<FormControl id="address.state_province">
						<FormLabel fontWeight={'600'}>State/Province</FormLabel>
						<Controller
							name="address.state_province"
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
					<FormControl id="address.city_locality">
						<FormLabel fontWeight={'600'}>City</FormLabel>
						<Controller
							name="address.city_locality"
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
				<Flex gap={'3rem'}>
					<FormControl id="address.country_code">
						<FormLabel fontWeight={'600'}>Country</FormLabel>
						<Controller
							name="address.country_code"
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
					<FormControl id="address.postal_code">
						<FormLabel fontWeight={'600'}>Postal Code</FormLabel>
						<Controller
							name="address.postal_code"
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

export default SenderAddressFormLTL;
