import { useForm } from 'react-hook-form';
import { Flex, Center, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Icon, Select } from '@chakra-ui/react';
import Logo from '../Logo/logo';
import Greeting from '../Greetings texts/greeting';
import FormHelperText from '../Form helper text/formHelperText';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsGlobe } from 'react-icons/bs';
import SubmitButton from '../Buttons/submitButton';
import { setUpCompany } from '../../services/apis/setupApi';
import BackButton from '../Buttons/backButton';

export type CompanyProfileFormData = {
	companyName: string;
	monthlyShipment: string;
	companyEmail: string;
	companyWebsite?: string;
	companyPhone: string;
};

const CompanyProfileForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<CompanyProfileFormData>();

	const onSubmit = async (values: CompanyProfileFormData) => {
		try {
			console.log(values);
			nextStep();
			// const result = await setUpCompany(values);
			// console.log(result);
		} catch (error) {
			console.error('Error message from company setup form:', error);
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
				<Greeting text={'Onboarding Your Company is Crucial!'} />
			</>

			<>
				<FormHelperText text={'Fill up the form below to setup your company profile'} />
			</>

			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={MdOutlineBusinessCenter} />
						</InputLeftElement>
						<Input
							id="companyName"
							placeholder="Company Name"
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('companyName')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.companyName && errors.companyName.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={HiOutlineMail} />
						</InputLeftElement>
						<Input
							id="companyEmail"
							placeholder="Company Email"
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('companyEmail')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.companyEmail && errors.companyEmail.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={BsTelephone} />
						</InputLeftElement>
						<Input
							id="companyPhone"
							placeholder="Contact Number"
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('companyPhone')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.companyPhone && errors.companyPhone.message}</FormErrorMessage>
				</FormControl>

				<FormControl mt={'1.20rem'}>
					<InputGroup>
						<InputLeftElement>
							<Icon as={BsGlobe} />
						</InputLeftElement>
						<Input
							id="companyWebsite"
							placeholder="www.example.com"
							_placeholder={{ color: 'black' }}
							border={'1px solid'}
							{...register('companyWebsite')}
						/>
					</InputGroup>
					<FormErrorMessage>{errors.companyWebsite && errors.companyWebsite.message}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					mt={'1.20rem'}>
					<Select
						id="monthlyShipment"
						placeholder="Monthly Shipment Volume"
						_placeholder={{ color: 'black' }}
						border={'1px solid'}
						{...register('monthlyShipment')}>
						<option>0 - 30 kg</option>
						<option>30 - 70 kg</option>
						<option> 70kg+ </option>
					</Select>
					<FormErrorMessage>{errors.monthlyShipment && errors.monthlyShipment.message}</FormErrorMessage>
				</FormControl>
				<Flex
					gap={'1rem'}
					mt={'3rem'}>
					<BackButton onClick={handleBackButton} />
					<SubmitButton text={'Next'} />
				</Flex>
			</form>
		</>
	);
};

export default CompanyProfileForm;
