import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Flex, Text, Select } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';

type SenderAddressFormData = {
	name: string;
	company_name: string;
	address_line1: string;
	city_locality: string;
	state_province: string;
	postal_code: string;
	country_code: string;
	phone: string;
};

const SenderAddressForm = ({ nextStep }: { nextStep: () => void }) => {
	const { control, handleSubmit } = useForm<SenderAddressFormData>({
		defaultValues: {
			name: 'John Doe',
			company_name: 'Example Corp.',
			address_line1: '4009 Marathon Blvd',
			city_locality: 'Austin',
			state_province: 'TX',
			postal_code: '78756',
			country_code: 'US',
			phone: '512-555-5555',
		},
	});

	const onSubmit: SubmitHandler<SenderAddressFormData> = (data) => {
		console.log(data);
		nextStep();
	};

	return (
		<Box
			p="2vw"
			width={'40rem'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Sender's Address
			</Text>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '2.5rem' }}>
				<Flex
					gap={'3rem'}
					mb={'2vw'}>
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

					<FormControl
						id="company_name"
						mb="4">
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
					mb={'2vw'}>
					<FormControl
						id="address_line1"
						mb="4">
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

					<FormControl
						id="city_locality"
						mb="4">
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
					mb={'2vw'}>
					<FormControl
						id="state_province"
						mb="4">
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

					<FormControl
						id="postal_code"
						mb="4">
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
					mb={'2vw'}>
					<FormControl
						id="country_code"
						mb="4">
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
									_focusVisible={{ borderColor: '#002855', boxShadow: '0px 1px 0px 0px #002855 ' }}>
									<option value={'US'}>United State of America</option>
									<option value={'CA'}>Canada</option>
									<option value={'MX'}>Mexico</option>
									<option value={'AU'}>Australia</option>
								</Select>
							)}
						/>
					</FormControl>

					<FormControl
						id="phone"
						mb="4">
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
					mt={'5rem'}>
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
