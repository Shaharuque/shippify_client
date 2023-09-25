import { useEffect, useState } from 'react';
import { useFetchLTLOptionsQuery } from '../../redux/api/ltlShipmentApi';
import { Box, Text, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch } from '@chakra-ui/react';
import SpinningLoader from '../Loader/spinningLoader';
import Error from '../Error bad request/error';
import { useForm, FormProvider } from 'react-hook-form';
import SubmitButton from '../Buttons/submitButton';
import { dummyProductDetails } from '../../data/dummyProductDetails';

export interface TPackageDetailsFormLTL {
	code: string;
	freight_class: number;
	nmfc_code: string;
	description: string;
	dimensions: {
		width: number;
		height: number;
		length: number;
		unit: string;
	};
	weight: {
		value: number;
		unit: string;
	};
	quantity: number;
	stackable: boolean;
	hazardous_materials: boolean;
}

const defaultValues: TPackageDetailsFormLTL = {
	code: 'pkg',
	freight_class: 200,
	nmfc_code: '',
	description: '',
	dimensions: {
		width: 0,
		height: 0,
		length: 0,
		unit: 'inches',
	},
	weight: {
		value: 0,
		unit: 'pounds',
	},
	quantity: 1,
	stackable: false,
	hazardous_materials: false,
};

const PackageDetailsFormLTL = () => {
	const token = localStorage.getItem('token');
	const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);
	const [packageCodes, setPackageCodes] = useState<any[]>([]);
	const [serviceOptions, setServiceOptions] = useState<any[]>([]);
	const [extraServices, setExtraServices] = useState<any[]>([]);

	const methods = useForm();
	const { handleSubmit, register } = useForm({ defaultValues });

	const onSubmit = (data: TPackageDetailsFormLTL) => {
		console.log('data:', data);
	};

	useEffect(() => {
		if (fetchLTLOptions) {
			console.log('Data:', fetchLTLOptions);
			setPackageCodes(fetchLTLOptions?.data?.packages);
			setServiceOptions(fetchLTLOptions?.data?.options);
			setExtraServices(fetchLTLOptions?.data?.services);
		}

		if (error) {
			console.error('Error fetching LTL rates:', error);
		}
	}, [fetchLTLOptions, error]);

	if (isLoading) {
		return (
			<Box>
				<SpinningLoader />
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Error />
			</Box>
		);
	}

	return (
		<Box
			p={'.25vw'}
			w={'45rem'}>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex
						gap={'1rem'}
						align={'center'}>
						<FormControl isRequired>
							<FormLabel whiteSpace={'nowrap'}>Package type:</FormLabel>
							<Select
								{...register('code')}
								defaultValue={'pkg'}
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
									boxShadow: '0 0 3px #002855 ',
								}}>
								{packageCodes.map((item: any, index: number) => (
									<option
										key={index}
										value={item.code}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Product:</FormLabel>
							<Select
								{...register('description')}
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
									boxShadow: '0 0 3px #002855 ',
								}}>
								{dummyProductDetails.map((item: any, index: number) => (
									<option
										key={index}
										value={item.nmfcCode}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl
							mt={'2rem'}
							isRequired>
							<Input
								{...register('nmfc_code')}
								type="text"
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
									boxShadow: '0 0 3px #002855 ',
								}}
							/>
						</FormControl>
					</Flex>
					<FormControl
						mt={'2rem'}
						isRequired>
						<Input
							h={'8vh'}
							type="text"
							placeholder="Product Description"
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}
						/>
					</FormControl>
					<Text
						fontWeight={'600'}
						mt={'1rem'}>
						Custom Dimension ( Length x Width x Height )
					</Text>
					<Flex
						mt={'.5rem'}
						gap={'1rem'}
						align={'center'}>
						<FormControl isRequired>
							<NumberInput
								precision={2}
								max={1000}>
								<NumberInputField
									{...register('dimensions.length')}
									placeholder="Length"
									border={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{
										borderColor: '#002855',
										boxShadow: '0 0 3px #002855 ',
									}}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						x
						<FormControl isRequired>
							<NumberInput
								precision={2}
								max={1000}>
								<NumberInputField
									{...register('dimensions.width')}
									placeholder="Width"
									border={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{
										borderColor: '#002855',
										boxShadow: '0 0 3px #002855 ',
									}}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						x
						<FormControl isRequired>
							<NumberInput
								precision={2}
								max={1000}>
								<NumberInputField
									{...register('dimensions.height')}
									placeholder="Height"
									border={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{
										borderColor: '#002855',
										boxShadow: '0 0 3px #002855 ',
									}}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl>
							<Select
								{...register('dimensions.unit')}
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
								}}>
								<option value={'inches'}>inch</option>
								<option value={'cm'}>cm</option>
							</Select>
						</FormControl>
					</Flex>
					<Text fontWeight={'600'}>Weight</Text>
					<Flex
						gap={'2rem'}
						alignItems={'center'}
						m={'.5rem 0'}>
						<FormControl isRequired>
							<NumberInput
								precision={2}
								max={150}>
								<NumberInputField
									{...register('weight.value')}
									placeholder="Weight"
									border={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{
										borderColor: '#002855',
										boxShadow: '0 0 3px #002855 ',
									}}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl>
							<Select
								{...register('weight.unit')}
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
								}}>
								<option value={'ounces'}>ounce</option>
								<option value={'pounds'}>pound</option>
								<option value={'kgs'}>kg</option>
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Stackable</FormLabel>
							<Switch />
						</FormControl>
					</Flex>

					<Box mt={'2rem'}>
						<SubmitButton
							text={'Save Details'}
							width="12rem"
						/>
					</Box>
				</form>
			</FormProvider>
		</Box>
	);
};

export default PackageDetailsFormLTL;
