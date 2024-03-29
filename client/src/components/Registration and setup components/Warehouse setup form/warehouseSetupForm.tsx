import { Center, FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, Select, Flex, Button } from '@chakra-ui/react';
import { BiSolidCity } from 'react-icons/bi';
import { BsPostcard } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import BackButton from '../../Buttons/backButton';
import SubmitButton from '../../Buttons/submitButton';
import Greeting from '../../Greetings texts/greeting';
import Logo from '../../Logo/logo';
import { useForm } from 'react-hook-form';
import FormHelperText from '../../Form helper text/formHelperText';
import { useNavigate } from 'react-router-dom';
import { setUpWarehouses } from '../../../services/apis/setupApi';

export type WarehouseSetupFormData = {
	warehouse_name: string;
	origin_address: {
		company_name: string;
		name: string;
		phone: string;
		address_line1: string;
		address_line2: string;
		city_locality: string;
		state_province: string;
		postal_code: string;
		country_code: string;
		address_residential_indicator: string;
	};
};

const WarehouseSetupForm = ({ prevStep }: { prevStep: () => void }) => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<WarehouseSetupFormData>();

	const onSubmit = async (values: WarehouseSetupFormData) => {
		try {
			const token: string | null = localStorage.getItem('token');
			const userTempData = localStorage.getItem('userData');
			if (userTempData && values?.origin_address) {
				const user = JSON.parse(userTempData);
				values.origin_address.name = user?.name;
			}
			const companyTempData = localStorage.getItem('companyTempData');
			if (companyTempData && values?.origin_address) {
				const company = JSON.parse(companyTempData);
				values.origin_address.company_name = company?.companyName;
				values.origin_address.phone = company?.companyPhone;
			}

			console.log('data from warehouse setup:', values);

			const result = await setUpWarehouses(values, token as string);

			if (result?.data?.status === 'success') {
				// console.log('response from warehouse:', result?.data?.data);
				reset({
					warehouse_name: '',
					origin_address: {
						address_line1: '',
						address_line2: '',
						state_province: '',
						city_locality: '',
						postal_code: '',
						country_code: '',
					},
				});
			}
		} catch (error) {
			console.error('Error from warehouse setup form:', error);
		}
	};

	return (
		<>
			<Center>
				<Logo />
			</Center>

			<>
				<Greeting text={'Tell us a bit more about your company!'} />
			</>
			<>
				<FormHelperText text={' Fill up pickup information for the carrier'} />
			</>

			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={FaRegAddressCard} />
						</InputLeftElement>
						<Input
							id="warehouse_name"
							placeholder="Warehouse name"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('warehouse_name')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors?.warehouse_name && errors?.warehouse_name.message}</FormErrorMessage>
				</FormControl>
				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={FaRegAddressCard} />
						</InputLeftElement>
						<Input
							id="addressOne"
							placeholder="First Address"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('origin_address.address_line1')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors?.origin_address?.address_line1 && errors?.origin_address?.address_line1.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={FaRegAddressCard} />
						</InputLeftElement>
						<Input
							id="addressTwo"
							placeholder="Second Address"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('origin_address.address_line2')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.origin_address?.address_line2 && errors.origin_address?.address_line2.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={BiSolidCity} />
						</InputLeftElement>
						<Input
							id="state"
							placeholder="State/Province"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('origin_address.state_province')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors?.origin_address?.state_province && errors?.origin_address?.state_province.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={BiSolidCity} />
						</InputLeftElement>
						<Input
							id="city"
							placeholder="City"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('origin_address.city_locality')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors?.origin_address?.city_locality && errors?.origin_address?.city_locality.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={BsPostcard} />
						</InputLeftElement>
						<Input
							id="zipCode"
							placeholder="Zip/Postal Code"
							_placeholder={{ color: '#808080' }}
							border={'1px solid'}
							{...register('origin_address.postal_code')}
						/>
					</InputGroup>
					<FormErrorMessage> {errors?.origin_address?.postal_code && errors?.origin_address?.postal_code.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<Select
						id="countryCode"
						placeholder="Country/Region"
						_placeholder={{ color: '#808080' }}
						border={'1px solid'}
						{...register('origin_address.country_code')}>
						<option value={'US'}>United States</option>
						<option value={'CA'}>Canada</option>
						<option value={'MX'}>Mexico</option>
					</Select>
					<FormErrorMessage>{errors?.origin_address?.country_code && errors?.origin_address?.country_code.message}</FormErrorMessage>
				</FormControl>

				<Flex
					gap={'1rem'}
					mt={'3rem'}
					justify={'space-evenly'}>
					<BackButton
						onClick={() => prevStep()}
						width="8rem"
					/>

					<SubmitButton
						text={'Submit'}
						width="8rem"
					/>
					<Button
						onClick={() => navigate('/home')}
						width="6rem"
						bg={'none'}>
						Skip
					</Button>
				</Flex>
			</form>
		</>
	);
};

export default WarehouseSetupForm;
