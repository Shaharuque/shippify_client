import { Box, Text, FormControl, Button, Select, Flex, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputStepper } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateField } from '../../../redux/features/basicShipmentsSlice';
import { RootState } from '../../../redux/store';
import PackageNumbers from '../../Package numbers boxes/packageNumbers';
import CustomsInfoForm from './customsInfoForm';
import PredefinedBoxes from '../../Predefined boxes/predefinedBoxes';

export type TPackageDetailsForm = {
	weight: {
		unit: string;
		value: number | null;
	};
	dimensions: {
		unit: string;
		height: number | null;
		width: number | null;
		length: number | null;
	};
	package_code: string;
};

const defaultValues: TPackageDetailsForm = {
	weight: {
		unit: 'pound',
		value: null,
	},
	dimensions: {
		unit: 'inch',
		length: null,
		width: null,
		height: null,
	},
	package_code: '',
};

const PackageDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const packages = useAppSelector((state: RootState) => state.basicShipments.packages);
	const sender = useAppSelector((state: RootState) => state.basicShipments.ship_from);
	const reciever = useAppSelector((state: RootState) => state.basicShipments.ship_to);
	const dispatch = useAppDispatch();

	const [isCustom, setIsCustom] = useState(false);
	const [numberInputChange, setNumberInputChange] = useState(false);
	const [addNew, setAddNew] = useState(false);
	const [editModeOn, setEditModeOn] = useState(false);
	const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);

	const [selectedPredefinedBoxCode, setSelectedPredefinedBoxCode] = useState<string | null>(null);
	const [weightValue, setWeightValue] = useState<number | null>(null);
	const [unit, setUnit] = useState('pound');

	const [defaultPackageValues, setDefaultPackageValues] = useState(defaultValues);

	const { register, handleSubmit, setValue, getValues } = useForm<TPackageDetailsForm>({
		defaultValues: defaultPackageValues,
	});

	const onSubmit = (data: TPackageDetailsForm) => {
		if (editModeOn) {
			const updatedPackages = [...packages];
			updatedPackages[selectedPackageIndex!] = data;
			dispatch(updateField({ packages: updatedPackages }));
		} else {
			const updatedPackages = [...packages, data];
			dispatch(updateField({ packages: updatedPackages }));
		}

		CustomReset();
	};

	const handleSelectPackage = (index: number) => {
		setAddNew(true);
		setEditModeOn(true);
		setSelectedPackageIndex(index);
		setNumberInputChange(false);
		const selectedPackage = packages[index];
		console.log('selected package:', selectedPackage);
		if (selectedPackage.package_code.length === 0) {
			setIsCustom(true);
			setValue('dimensions.length', selectedPackage?.dimensions?.length);
			setValue('dimensions.width', selectedPackage?.dimensions?.width);
			setValue('dimensions.height', selectedPackage?.dimensions?.height);
			setValue('dimensions.unit', selectedPackage?.dimensions.unit);
			setValue('weight.value', selectedPackage?.weight?.value);
			setValue('weight.unit', selectedPackage?.weight?.unit);
		} else {
			setIsCustom(false);
			setWeightValue(selectedPackage?.weight?.value);
			setUnit(selectedPackage?.weight?.unit);
			setSelectedPredefinedBoxCode(selectedPackage?.package_code);
		}

		setDefaultPackageValues(selectedPackage);
	};

	const customDimensionFormValidator = () => {
		return getValues('dimensions.height') === 0 || getValues('dimensions.width') === 0 || getValues('dimensions.length') === 0 || getValues('weight.value') === 0 || !numberInputChange;
	};

	const handleSelectPredefinedBoxCode = (code: string | null) => {
		selectedPredefinedBoxCode === code ? setSelectedPredefinedBoxCode(null) : setSelectedPredefinedBoxCode(code);

		setNumberInputChange(true);
	};
	const handlePredefinedWeightChange = (weight: number | null) => {
		setWeightValue(weight);
		setNumberInputChange(true);
	};
	const handlePredefinedUnitChange = (unit: string) => {
		setUnit(unit);
	};

	const handlePredefinedBoxAddButtonClick = () => {
		if (editModeOn) {
			const updatedPackages = packages.map((pkg, index) => {
				if (index === selectedPackageIndex) {
					return {
						...pkg,
						weight: {
							unit: unit,
							value: weightValue,
						},
						package_code: selectedPredefinedBoxCode!,
					};
				}
				return pkg;
			});
			dispatch(updateField({ packages: updatedPackages }));
		} else {
			const weight = { unit: unit, value: weightValue };
			const newPackage = {
				weight,
				package_code: selectedPredefinedBoxCode,
			};
			const updatedPackages = [...packages, newPackage];
			dispatch(updateField({ packages: updatedPackages }));
		}
		setUnit('pound');
		setWeightValue(null);
		setSelectedPredefinedBoxCode(null);
		setEditModeOn(false);
		setSelectedPackageIndex(null);
		setAddNew(false);
	};

	const CustomReset = () => {
		setIsCustom(false);
		setAddNew(false);
		setEditModeOn(false);
		setSelectedPackageIndex(null);
		setNumberInputChange(false);
		setSelectedPredefinedBoxCode(null);
		setWeightValue(null);
		setUnit('pound');
		setValue('dimensions.length', null);
		setValue('dimensions.width', null);
		setValue('dimensions.height', null);
		setValue('dimensions.unit', 'inch');
		setValue('weight.value', null);
		setValue('weight.unit', 'pound');
	};

	const handleRemovePackage = () => {
		const updatedPackages = packages.filter((_, index) => index !== selectedPackageIndex);

		dispatch(updateField({ packages: updatedPackages }));
		CustomReset();
		setSelectedPredefinedBoxCode(null);
	};

	return (
		<Box
			p={'.25vw'}
			w={'40rem'}
			overflowY={'scroll'}
			h={'800px'}
			css={{
				'&::-webkit-scrollbar': {
					width: '0',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderRadius: '0.25em',
				},
			}}>
			{sender?.country_code !== reciever?.country_code ? <CustomsInfoForm /> : null}
			<PackageNumbers
				packages={packages}
				onSelectPackage={handleSelectPackage}
				selectedPackageIndex={selectedPackageIndex}
			/>
			<Flex
				gap={'2rem'}
				align={'center'}
				m={'1rem 0'}>
				<Button
					type="button"
					w={'20rem'}
					p={'.5rem'}
					bg={isCustom ? 'gray.100' : 'cta'}
					color={isCustom ? 'black' : 'primary'}
					onClick={() => setIsCustom((prev) => !prev)}>
					Predefined boxes
				</Button>
				<Text>or</Text>
				<Button
					type="button"
					w={'20rem'}
					p={'.5rem'}
					bg={isCustom ? 'cta' : 'gray.100'}
					color={isCustom ? 'primary' : 'black'}
					onClick={() => setIsCustom((prev) => !prev)}>
					Custom dimension
				</Button>
			</Flex>

			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '1.5rem' }}>
				{isCustom ? (
					<>
						<Text
							fontWeight={'600'}
							mt={'4rem'}>
							Custom Dimension (Length x Width x Height)
						</Text>
						<Flex
							gap={'2rem'}
							m={'1rem 0'}
							alignItems={'center'}>
							<FormControl isRequired>
								<NumberInput
									precision={2}
									max={70}
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
									max={70}
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
									max={70}
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
									<option value={'inch'}>inch</option>
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
									max={150}
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
									<option value={'ounce'}>ounce</option>
									<option value={'pound'}>pound</option>
									<option value={'kg'}>kg</option>
								</Select>
							</FormControl>
							<Flex
								gap={'.75rem'}
								align={'center'}>
								<RegularButton
									onClick={handleRemovePackage}
									text="Remove"
									width="8rem"
									onHoverColor="#DC143C"
									isDisabled={!editModeOn}
								/>
								<SubmitButton
									text={editModeOn ? 'Update' : 'Add package'}
									width="8rem"
									isDisabled={customDimensionFormValidator()}
								/>
							</Flex>
						</Flex>
					</>
				) : (
					<>
						<PredefinedBoxes
							inputChanged={numberInputChange}
							editModeOn={editModeOn}
							selectedCode={selectedPredefinedBoxCode}
							weightValue={weightValue}
							unit={unit}
							onPredefinedUnitChange={handlePredefinedUnitChange}
							onPredefinedWeightChange={handlePredefinedWeightChange}
							onPredefinedBoxCodeSelect={handleSelectPredefinedBoxCode}
							onPredefinedSubmit={handlePredefinedBoxAddButtonClick}
							removePackage={handleRemovePackage}
						/>
					</>
				)}

				<Flex
					mt={'4rem'}
					justify={'space-between'}>
					<BackButton
						onClick={() => prevStep()}
						width="8rem"
					/>

					<Flex
						justify={'flex-end'}
						gap={'1rem'}>
						{addNew ? (
							<RegularButton
								onClick={CustomReset}
								text={'Add new'}
								width="8rem"
							/>
						) : null}

						<RegularButton
							text="Continue"
							width="12rem"
							onClick={nextStep}
							isDisabled={packages.length === 0}
							error_message="You haven't added any package!"
						/>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};

export default PackageDetailsForm;
