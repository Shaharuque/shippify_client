import { Flex, FormControl, FormLabel, Input, Select, Box, Text } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import { useForm, SubmitHandler } from 'react-hook-form';

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
	const { handleSubmit, register } = useForm<TRecieverAddressFormDataLTL>({
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
				Receiver's Address
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
							<Input
								{...register('contact.name')}
								variant={'flushed'}
								borderBottom={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
							/>
						</FormControl>

						<FormControl id="contact.email">
							<FormLabel fontWeight={'600'}>Contact Email</FormLabel>
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
						<FormControl id="contact.phone_number">
							<FormLabel fontWeight={'600'}>Contact Number</FormLabel>
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
					<FormControl id="address.company_name">
						<FormLabel fontWeight={'600'}>Company Name</FormLabel>
						<Input
							{...register('address.company_name')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl id="address.country_code">
						<FormLabel fontWeight={'600'}>Country</FormLabel>
						<Select
							{...register('address.country_code')}
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
				</Flex>
				<Flex
					gap={'3rem'}
					mb={'3vh'}>
					<FormControl id="address.state_province">
						<FormLabel fontWeight={'600'}>State/Province</FormLabel>
						<Input
							{...register('address.state_province')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
					<FormControl id="address.city_locality">
						<FormLabel fontWeight={'600'}>City</FormLabel>
						<Input
							{...register('address.city_locality')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>
				</Flex>
				<Flex gap={'3rem'}>
					<FormControl id="address.address_line1">
						<FormLabel fontWeight={'600'}>Street</FormLabel>
						<Input
							{...register('address.address_line1')}
							variant={'flushed'}
							borderBottom={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}
						/>
					</FormControl>

					<FormControl id="address.postal_code">
						<FormLabel fontWeight={'600'}>Postal Code</FormLabel>
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
