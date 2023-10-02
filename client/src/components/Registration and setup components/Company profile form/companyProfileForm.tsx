import { useForm } from 'react-hook-form';
import { Flex, Center, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Icon, Select } from '@chakra-ui/react';
import Logo from '../../Logo/logo';
import Greeting from '../../Greetings texts/greeting';
import FormHelperText from '../../Form helper text/formHelperText';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsGlobe } from 'react-icons/bs';
import SubmitButton from '../../Buttons/submitButton';
import { setUpCompany } from '../../../services/apis/setupApi';
import BackButton from '../../Buttons/backButton';

export type CompanyProfileFormData = {
	companyName: string;
	monthlyShipmentValue: string;
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
			const token: any = localStorage.getItem('token');
			const result = await setUpCompany(values, token);

			if (result?.data?.status === 'success') {
				nextStep();
			}
		} catch (error) {
			console.error('Error message from company setup form:', error);
		}
	};

	const handleBackButton = () => {
		prevStep();
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
							_placeholder={{ color: '#808080' }}
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
							_placeholder={{ color: '#808080' }}
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
							_placeholder={{ color: '#808080' }}
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
							_placeholder={{ color: '#808080' }}
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
						id="monthlyShipmentValue"
						placeholder="Monthly Shipment Volume"
						_placeholder={{ color: '#808080' }}
						border={'1px solid'}
						{...register('monthlyShipmentValue')}>
						<option value={'0-30'}>0 - 30 kg</option>
						<option value={'30-70'}>30 - 70 kg</option>
						<option value={'70+'}> 70 kg+ </option>
					</Select>
					<FormErrorMessage>{errors.monthlyShipmentValue && errors.monthlyShipmentValue.message}</FormErrorMessage>
				</FormControl>
				<Flex
					gap={'1rem'}
					mt={'3rem'}>
					<BackButton
						onClick={handleBackButton}
						width="6rem"
					/>
					<SubmitButton
						text={'Next'}
						width="6rem"
					/>
				</Flex>
			</form>
		</>
	);
};

export default CompanyProfileForm;
