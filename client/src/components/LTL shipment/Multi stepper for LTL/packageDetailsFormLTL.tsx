import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchLTLOptionsQuery } from '../../../redux/api/ltlShipmentApi';
import { Box, Text, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch } from '@chakra-ui/react';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../Buttons/submitButton';
import { dummyProductDetails } from '../../../data/dummyProductDetails';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/features/ltlShipmentSlice';
import PackageNumbers from '../../Package numbers boxes/packageNumbers';

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

const PackageDetailsFormLTL = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const token = localStorage.getItem('token');
	// const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);
	const [packageCodes, setPackageCodes] = useState<any[]>([]);
	const [defaultPackageValues, setDefaultPackageValues] = useState(defaultValues);

	const dispatch = useAppDispatch();
	const packages = useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.packages);

	const { handleSubmit, register, setValue, reset } = useForm<TPackageDetailsFormLTL>({ defaultValues: defaultPackageValues });

	const onSubmit = (data: TPackageDetailsFormLTL) => {
		const selectedProduct = data.description;
		const selectedProductDetails = dummyProductDetails.find((product) => product.name === selectedProduct);
		data.freight_class = selectedProductDetails!.freightNumber;
		console.log('data:', data);

		const updatedPackages = [...packages, data];
		dispatch(updateField({ packages: updatedPackages }));

		reset(defaultPackageValues);
	};

	useEffect(() => {
		reset(defaultPackageValues);
	}, [defaultPackageValues]);

	const handleProductSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const selectedProduct = event.target.value;

		const selectedProductDetails = dummyProductDetails.find((product) => product.name === selectedProduct);

		if (selectedProductDetails) {
			setValue('nmfc_code', selectedProductDetails.nmfcCode);
		}
	};

	const handleContinueButton = () => {
		nextStep();
	};

	// useEffect(() => {
	// 	if (fetchLTLOptions) {
	// 		console.log('Data:', fetchLTLOptions);
	// 		setPackageCodes(fetchLTLOptions?.data?.packages);
	// 	}

	// 	if (error) {
	// 		console.error('Error fetching LTL options:', error);
	// 	}
	// }, [fetchLTLOptions, error]);

	// if (isLoading) {
	// 	return (
	// 		<Box>
	// 			<SpinningLoader />
	// 		</Box>
	// 	);
	// }

	// if (error) {
	// 	return (
	// 		<Box>
	// 			<Error />
	// 		</Box>
	// 	);
	// }

	const handleSelectPackage = (index: number) => {
		const selectedPackage = packages[index];
		console.log('selected package:', selectedPackage);

		setValue('dimensions.length', selectedPackage.dimensions.length);
		setValue('dimensions.width', selectedPackage.dimensions.width);
		setValue('dimensions.height', selectedPackage.dimensions.height);
		setValue('dimensions.unit', selectedPackage.dimensions.unit);
		setValue('weight.value', selectedPackage.weight.value);
		setValue('weight.unit', selectedPackage.weight.unit);

		setDefaultPackageValues(selectedPackage);
	};

	return (
		<Box
			p={'.25vw'}
			w={'45rem'}
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
			<PackageNumbers
				packages={packages}
				onSelectPackage={handleSelectPackage}
			/>
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
							{/* {packageCodes.map((item: any, index: number) => (
								<option
									key={index}
									value={item.code}>
									{item.name}
								</option>
							))} */}
							<option value={'pkg'}>Package</option>
							<option value={'bag'}>Bag</option>
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
							}}
							onChange={handleProductSelect}>
							{dummyProductDetails.map((item: any, index: number) => (
								<option
									key={index}
									value={item.name}>
									{item.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl
						mt={'2rem'}
						isRequired>
						<Input
							id="nmfc_code"
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
					mt={'4rem'}>
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
				<Text
					fontWeight={'600'}
					mt={'.75rem'}>
					Weight
				</Text>
				<Flex
					gap={'2rem'}
					alignItems={'center'}
					m={'.5rem 0'}>
					<FormControl isRequired>
						<NumberInput
							precision={2}
							min={150}
							max={1000}>
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
					<FormControl style={{ display: 'flex', alignItems: 'center' }}>
						<Text
							fontWeight={'600'}
							mr={'1rem'}>
							Stackable
						</Text>
						<Switch
							{...register('stackable')}
							colorScheme="teal"
						/>
					</FormControl>
					<FormControl style={{ display: 'flex', alignItems: 'center' }}>
						<Text
							fontWeight={'600'}
							mr={'1rem'}>
							Hazardous
						</Text>
						<Switch
							{...register('hazardous_materials')}
							colorScheme="teal"
						/>
					</FormControl>
				</Flex>

				<Flex
					mt={'4rem'}
					justify={'space-between'}>
					<SubmitButton
						text={'Add package'}
						width="15rem"
					/>
					<Flex gap={'1rem'}>
						<BackButton
							onClick={() => prevStep()}
							width="8rem"
						/>
						<RegularButton
							onClick={handleContinueButton}
							text={'Continue'}
							width="12rem"
							// isDisabled={packages.length === 1 && packages[0].nmfc_code.length === 0}
						/>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};

export default PackageDetailsFormLTL;
