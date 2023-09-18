import { useForm } from 'react-hook-form';
import { Center, FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, Flex, Select } from '@chakra-ui/react';
import Logo from '../Logo/logo';
import FormHelperText from '../Form helper text/formHelperText';
import Greeting from '../Greetings texts/greeting';
import { BsPostcard } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiSolidCity } from 'react-icons/bi';
import SubmitButton from '../Buttons/submitButton';
import BackButton from '../Buttons/backButton';

export type AddressSetupFormData = {
	countryCode: string;
	addressOne: string;
	addressTwo: string;
	state: string;
	city: string;
	zipCode: number;
};

const AddressSetupForm = ({ prevStep }: { prevStep: () => void }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<AddressSetupFormData>();

	const onSubmit = async (values: AddressSetupFormData) => {
		try {
			console.log(values);
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
				<Logo />
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
							{...register('addressOne')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.addressOne && errors.addressOne.message}</FormErrorMessage>
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
							{...register('addressTwo')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.addressTwo && errors.addressTwo.message}</FormErrorMessage>
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
							{...register('state')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.state && errors.state.message}</FormErrorMessage>
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
							{...register('city')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
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
							{...register('zipCode')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.zipCode && errors.zipCode.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<Select
						id="countryCode"
						placeholder="Country/Region"
						_placeholder={{ color: 'black' }}
						border={'1px solid'}
						{...register('countryCode')}>
						<option value={'US'}>United States</option>
						<option value={'CA'}>Canada</option>
						<option value={'MX'}>Mexico</option>
					</Select>
					<FormErrorMessage>{errors.countryCode && errors.countryCode.message}</FormErrorMessage>
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
