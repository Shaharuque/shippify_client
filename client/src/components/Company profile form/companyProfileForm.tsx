import { useForm } from 'react-hook-form';
import { Flex, Box, Center, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Icon, Select } from '@chakra-ui/react';
import Logo from '../Logo/logo';
import Greeting from '../Greetings texts/greeting';
import FormHelperText from '../Form helper text/formHelperText';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone, BsGlobe } from 'react-icons/bs';
import SubmitButton from '../Buttons/submitButton';

export type CompanyProfileFormData = {
	name: string;
	monthlyShipment: string;
	email: string;
	website?: string;
	phone: string;
};

const CompanyProfileForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<CompanyProfileFormData>();

	const onSubmit = async (values: CompanyProfileFormData) => {
		try {
			console.log(values);
		} catch (error) {
			console.error('Error message from company setup form:', error);
		}
	};

	return (
		<Flex
			flex={0.5}
			direction={'column'}
			justify={'center'}>
			<Box
				p={'1rem'}
				m={'0 auto'}
				w={'25rem'}>
				<Center
					pos={'relative'}
					top={'-4rem'}
					left={'-.75rem'}>
					<Logo />
				</Center>

				<>
					<Greeting text={'Kick off with an easy step!'} />
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
								id="name"
								placeholder="Company Name"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('name')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={HiOutlineMail} />
							</InputLeftElement>
							<Input
								id="email"
								placeholder="Company Email"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('email')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={BsTelephone} />
							</InputLeftElement>
							<Input
								id="phone"
								placeholder="Contact Number"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('phone')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
					</FormControl>

					<FormControl mt={'1.20rem'}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={BsGlobe} />
							</InputLeftElement>
							<Input
								id="website"
								placeholder="www.example.com"
								_placeholder={{ color: 'black' }}
								border={'1px solid'}
								{...register('website')}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.website && errors.website.message}</FormErrorMessage>
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
					</FormControl>
					<>
						<SubmitButton text={'Submit'} />
					</>
				</form>
			</Box>
		</Flex>
	);
};

export default CompanyProfileForm;
