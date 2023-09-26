import { Flex, FormControl, FormLabel, Input, Select, Box, Text } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../../Buttons/submitButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import BackButton from '../../Buttons/backButton';

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
	const { control, handleSubmit } = useForm<TRecieverAddressFormDataLTL>({
		defaultValues: {
			...useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.ship_to),
		},
	});

	const onSubmit: SubmitHandler<TRecieverAddressFormDataLTL> = (data) => {
		dispatch(updateField({ ship_to: data }));
		nextStep();
	};
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
				Reciever's Address
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
