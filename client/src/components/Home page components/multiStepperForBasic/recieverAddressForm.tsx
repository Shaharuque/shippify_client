import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Flex, Text, Select } from '@chakra-ui/react';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import { useEffect } from 'react';
import axios from 'axios';

type BillingFormData = {
	name: string;
	company_name: string;
	address_line1: string;
	city_locality: string;
	state_province: string;
	postal_code: string;
	country_code: string;
	phone: string;
};

const ReceiverAddressForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	//api hit for rates
	// useEffect(() => {
	// 	const fetcRates = async () => {
	// 		const formData = {
	// 			shipments: [
	// 				{
	// 					ship_from: {
	// 						name: 'John Doe',
	// 						company_name: 'Example Corp.',
	// 						address_line1: 'Exebridge',
	// 						city_locality: 'Dulverton',
	// 						state_province: 'LD',
	// 						postal_code: 'TA22 9AZ',
	// 						country_code: 'GB',
	// 						phone: '512-555-5555',
	// 					},
	// 					ship_to: {
	// 						name: 'Amanda Miller',
	// 						address_line1: 'Newcastle-under-Lyme',
	// 						city_locality: 'Staffordshire',
	// 						state_province: 'LJ',
	// 						postal_code: 'ST5 2RN',
	// 						country_code: 'GB',
	// 					},
	// 					packages: [
	// 						{
	// 							weight: {
	// 								value: 30,
	// 								unit: 'pound',
	// 							},
	// 							// package_code: 'custom_laptop_box',
	// 							dimensions: {
	// 								unit: 'inch',
	// 								length: 8.0,
	// 								width: 8.0,
	// 								height: 8.0,
	// 							},
	// 						},

	// 						// {
	// 						// 	weight: {
	// 						// 		value: 60,
	// 						// 		unit: 'pound',
	// 						// 	},
	// 						// 	// package_code: 'custom_laptop_box',
	// 						// 	dimensions: {
	// 						// 		unit: 'inch',
	// 						// 		length: 20.0,
	// 						// 		width: 9.1,
	// 						// 		height: 6.0,
	// 						// 	},
	// 						// },
	// 					],
	// 				},
	// 			],
	// 		};

	// 		try {
	// 			const response = await axios.post('http://192.168.68.78:5000/shipment/rates', formData, {
	// 				headers: {
	// 					'Content-Type': 'application/json', // Example header
	// 					// Add other headers as needed
	// 				},
	// 			});

	// 			console.log('Response:', response.data);
	// 		} catch (error) {
	// 			console.error('Error:', error);
	// 		}
	// 	};

	// 	fetcRates();
	// }, []);

	const { control, handleSubmit } = useForm<BillingFormData>({
		defaultValues: {
			name: 'Jane Doe',
			city_locality: 'Glendale',
			address_line1: '620 Milford street',
			state_province: 'CA',
			postal_code: '91203',
			country_code: 'US',
		},
	});

	const onSubmit: SubmitHandler<BillingFormData> = (data) => {
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
				Reciever's Address
			</Text>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '2.5rem' }}>
				<Flex
					gap={'3rem'}
					mb={'2vw'}>
					<FormControl id="name">
						<FormLabel fontWeight={'600'}>Name</FormLabel>
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
						id="address_line1"
						mb="4">
						<FormLabel fontWeight={'600'}>Street Address</FormLabel>
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
