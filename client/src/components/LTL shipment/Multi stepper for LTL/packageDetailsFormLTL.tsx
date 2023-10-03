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
import PackageTypeCardLTL from '../../Cards/Package type card/packageTypeCardLTL';
import { packageCodeToImageDictionary } from '../../Cards/Package type card/packageCodeToImageDictionary';

export interface TPackageDetailsFormLTL {
	code: string;
	freight_class: number;
	nmfc_code: string;
	description: string;
	dimensions: {
		width: number | null;
		height: number | null;
		length: number | null;
		unit: string;
	};
	weight: {
		value: number | null;
		unit: string;
	};
	quantity: number | null;
	stackable: boolean;
	hazardous_materials: boolean;
}

const defaultValues: TPackageDetailsFormLTL = {
	code: '',
	freight_class: 200,
	nmfc_code: '',
	description: '',
	dimensions: {
		width: null,
		height: null,
		length: null,
		unit: 'inches',
	},
	weight: {
		value: null,
		unit: 'pounds',
	},
	quantity: null,
	stackable: false,
	hazardous_materials: false,
};

const PackageDetailsFormLTL = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const token = localStorage.getItem('token');
	const dispatch = useAppDispatch();
	const packages = useAppSelector((state: RootState) => state?.ltlShipments?.shipment?.packages);

	const { data: fetchLTLOptions, error, isLoading } = useFetchLTLOptionsQuery(token);

	const [packageCodes, setPackageCodes] = useState<any[]>([]);

	const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);
	const [selectedPackageCode, setSelectedPackageCode] = useState<string | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [numberInputChange, setNumberInputChange] = useState(false);
	const [switchValue, setSwitchValue] = useState(false);
	const [hazardousMaterialsValue, setHazardousMaterialsValue] = useState(false);

	const { handleSubmit, register, setValue, reset, getValues } = useForm<TPackageDetailsFormLTL>({ defaultValues });

	const onSubmit = (data: TPackageDetailsFormLTL) => {
		const selectedProduct = data.description;
		const selectedProductDetails = dummyProductDetails.find((product) => product.name === selectedProduct);
		data.freight_class = selectedProductDetails!.freightNumber;
		if (selectedPackageCode) data.code = selectedPackageCode;
		data.stackable = switchValue;
		data.hazardous_materials = hazardousMaterialsValue;

		console.log('data:', data);

		if (editMode) {
			const updatedPackages = [...packages];
			updatedPackages[selectedPackageIndex!] = data;
			dispatch(updateField({ packages: updatedPackages }));
		} else {
			const updatedPackages = [...packages, data];
			dispatch(updateField({ packages: updatedPackages }));
		}

		CustomReset();
	};

	const handleProductSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const selectedProduct = event.target.value;

		const selectedProductDetails = dummyProductDetails.find((product) => product.name === selectedProduct);

		if (selectedProductDetails) {
			setValue('nmfc_code', selectedProductDetails.nmfcCode);
		}
	};

	const handlePackageTypeCode = (code: string | null) => {
		if (selectedPackageCode === code) setSelectedPackageCode(null);
		else setSelectedPackageCode(code);
	};

	const handleSelectPackage = (index: number) => {
		if (selectedPackageIndex !== index) {
			reset(defaultValues);
			setSelectedPackageIndex(index);
			setEditMode(true);
			setNumberInputChange(false);
			const selectedPackage = packages[index];
			console.log('selected package:', selectedPackage);

			setValue('quantity', selectedPackage?.quantity);
			setValue('dimensions.length', selectedPackage?.dimensions?.length);
			setValue('dimensions.width', selectedPackage?.dimensions?.width);
			setValue('dimensions.height', selectedPackage?.dimensions?.height);
			setValue('dimensions.unit', selectedPackage?.dimensions?.unit);
			setValue('weight.value', selectedPackage?.weight?.value);
			setValue('weight.unit', selectedPackage?.weight?.unit);
			setValue('nmfc_code', selectedPackage?.nmfc_code);
			setSwitchValue(selectedPackage?.stackable);
			setHazardousMaterialsValue(selectedPackage?.hazardous_materials);
			setSelectedPackageCode(selectedPackage?.code);
		}
	};

	const CustomReset = () => {
		reset(defaultValues);
		setSelectedPackageIndex(null);
		setEditMode(false);
		setSelectedPackageCode(null);
		setSwitchValue(false);
		setHazardousMaterialsValue(false);
	};

	const customDimensionFormValidator = () => {
		const result = getValues('dimensions.height') === null || getValues('dimensions.width') === null || getValues('dimensions.length') === null || getValues('weight.value') === null || !numberInputChange || selectedPackageCode === null || getValues('quantity') === null;

		console.log('validator', result);
		return result;
	};

	const handleRemoveButton = () => {
		const updatedPackages = packages.filter((_, index) => index !== selectedPackageIndex);

		dispatch(updateField({ packages: updatedPackages }));
		CustomReset();
	};

	useEffect(() => {
		if (fetchLTLOptions) {
			setPackageCodes(fetchLTLOptions?.data?.packages);
		}

		if (error) {
			console.error('Error fetching LTL options:', error);
		}
	}, [fetchLTLOptions]);

	if (isLoading) {
		return <SpinningLoader />;
	}

	if (error) {
		return (
			<>
				<Error />
			</>
		);
	}

	return (
		<Box
			p={'.25vw'}
			w={'45rem'}
			overflowY={'scroll'}>
			<PackageNumbers
				packages={packages}
				onSelectPackage={handleSelectPackage}
				selectedPackageIndex={selectedPackageIndex}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap={'1rem'}
					mb={'1.5rem'}>
					{packageCodes?.map((item: any, index: number) => (
						<PackageTypeCardLTL
							key={index}
							text={item.name}
							code={item.code}
							image={packageCodeToImageDictionary[item.code]}
							isSelected={selectedPackageCode === item.code}
							onSelect={handlePackageTypeCode}
						/>
					))}
				</Flex>
				<Flex
					gap={'1rem'}
					align={'center'}>
					<FormControl isRequired>
						<FormLabel>Quantity:</FormLabel>
						<NumberInput onChange={() => setNumberInputChange(true)}>
							<NumberInputField
								id="quantity"
								{...register('quantity')}
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

					<FormControl isRequired>
						<FormLabel>Product:</FormLabel>
						<Select
							{...register('description')}
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							placeholder="Select product type"
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
						isReadOnly>
						<Input
							id="nmfc_code"
							{...register('nmfc_code')}
							placeholder="NMFC code"
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
							max={1000}
							onChange={() => setNumberInputChange(true)}>
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
							max={1000}
							onChange={() => setNumberInputChange(true)}>
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
							max={1000}
							onChange={() => setNumberInputChange(true)}>
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
							max={1000}
							onChange={() => setNumberInputChange(true)}>
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
					<FormControl
						style={{ display: 'flex', alignItems: 'center' }}
						id="stackable">
						<Text
							fontWeight={'600'}
							mr={'1rem'}>
							Stackable
						</Text>
						<Switch
							onChange={() => setSwitchValue((prev) => !prev)}
							colorScheme="teal"
							isChecked={switchValue}
						/>
					</FormControl>
					<FormControl
						style={{ display: 'flex', alignItems: 'center' }}
						id="hazardous_materials">
						<Text
							fontWeight={'600'}
							mr={'1rem'}>
							Hazardous
						</Text>
						<Switch
							onChange={() => setHazardousMaterialsValue((prev) => !prev)}
							colorScheme="teal"
							isChecked={hazardousMaterialsValue}
						/>
					</FormControl>
				</Flex>

				<Flex
					mt={'4rem'}
					justify={'space-between'}>
					<Flex gap={'1rem'}>
						<SubmitButton
							text={editMode ? 'Update' : 'Add package'}
							width="8rem"
							isDisabled={customDimensionFormValidator()}
						/>
						{editMode ? (
							<RegularButton
								text="Remove"
								width="6rem"
								onHoverColor="#DC143C"
								// isDisabled={!editMode}
								onClick={handleRemoveButton}
							/>
						) : null}

						{editMode ? (
							<RegularButton
								text="Add new"
								width="6rem"
								onClick={CustomReset}
								// isDisabled={!editMode}
							/>
						) : null}
					</Flex>
					<Flex gap={'1rem'}>
						<BackButton
							onClick={() => prevStep()}
							width="6rem"
						/>
						<RegularButton
							onClick={() => nextStep()}
							text={'Continue'}
							width="8rem"
							isDisabled={packages?.length === 0}
							error_message="You havn't added any package!"
						/>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};

export default PackageDetailsFormLTL;
