import { useForm } from 'react-hook-form';
import { Center, FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, Flex, Select } from '@chakra-ui/react';
import Logo from '../../Logo/logo';
import FormHelperText from '../../Form helper text/formHelperText';
import Greeting from '../../Greetings texts/greeting';
import { BsPostcard } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiSolidCity } from 'react-icons/bi';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import { setUpCompanyAddress } from '../../../services/apis/setupApi';
import { useNavigate } from 'react-router-dom';

export type AddressSetupFormData = {
	country_code: string;
	address_line1: string;
	address_line2: string;
	state_province: string;
	city_locality: string;
	postal_code: number;
};

const AddressSetupForm = ({ prevStep }: { prevStep: () => void }) => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<AddressSetupFormData>();

	const onSubmit = async (values: AddressSetupFormData) => {
		try {
			const token: any = localStorage.getItem('token');
			const data = { address: values };

			const result = await setUpCompanyAddress(data, token);
			console.log('Address profile setup:', result);
			if (result?.data?.status === 'success') navigate('/home');
		} catch (error) {
			console.error('Error from address setup form:', error);
		}
	};

	const handleBackButton = () => {
		prevStep();
	};

	return (
		<>
			<Center
				pos={'relative'}
				top={'-4rem'}
				left={'-.75rem'}>
				<Logo
					boxSize={'8rem'}
					fontSize={'1.25rem'}
				/>
			</Center>

			<>
				<Greeting text={'Good To See You Again!'} />
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
							id="addressOne"
							placeholder="First Address"
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('address_line1')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.address_line1 && errors.address_line1.message}</FormErrorMessage>
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
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('address_line2')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.address_line2 && errors.address_line2.message}</FormErrorMessage>
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
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('state_province')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.state_province && errors.state_province.message}</FormErrorMessage>
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
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('city_locality')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.city_locality && errors.city_locality.message}</FormErrorMessage>
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
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('postal_code')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.postal_code && errors.postal_code.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<Select
						id="countryCode"
						placeholder="Country/Region"
						_placeholder={{ color: 'black' }}
						border={'1px solid'}
						{...register('country_code')}>
						<option value={'US'}>United States</option>
						<option value={'CA'}>Canada</option>
						<option value={'MX'}>Mexico</option>
					</Select>
					<FormErrorMessage>{errors.country_code && errors.country_code.message}</FormErrorMessage>
				</FormControl>

				<Flex
					gap={'1rem'}
					mt={'3rem'}>
					<BackButton onClick={handleBackButton} />
					<SubmitButton text={'Submit'} />
				</Flex>
			</form>
		</>
	);
};

export default AddressSetupForm;
