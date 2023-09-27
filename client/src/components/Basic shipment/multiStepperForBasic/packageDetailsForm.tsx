import { Box, Text, FormControl, Button, Select, Flex, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputStepper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
		value: number;
	};
	dimensions: {
		unit: string;
		height: number;
		width: number;
		length: number;
	};
	package_code: string;
};

const defaultValues: TPackageDetailsForm = {
	weight: {
		unit: 'pound',
		value: 0.0,
	},
	dimensions: {
		unit: 'inch',
		length: 0.0,
		width: 0.0,
		height: 0.0,
	},
	package_code: '',
};

const PackageDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [isCustom, setIsCustom] = useState(false);
	const [isPredefined, setIsPredefined] = useState(false);
	const dispatch = useAppDispatch();
	const packages = useAppSelector((state: RootState) => state.basicShipments.packages);
	const sender = useAppSelector((state: RootState) => state.basicShipments.ship_from);
	const reciever = useAppSelector((state: RootState) => state.basicShipments.ship_to);

	const [defaultPackageValues, setDefaultPackageValues] = useState(defaultValues);

	const { register, handleSubmit, reset, setValue } = useForm<TPackageDetailsForm>({
		defaultValues: defaultPackageValues,
	});

	const onSubmit = (data: TPackageDetailsForm) => {
		const updatedPackages = [...packages, data];
		dispatch(updateField({ packages: updatedPackages }));

		setIsCustom((prev) => !prev);
		setValue('weight.value', 0);
		reset(defaultPackageValues);
	};

	useEffect(() => {
		reset(defaultPackageValues);
	}, [defaultPackageValues]);

	const handleContinue = () => {
		nextStep();
	};

	const handleSelectPackage = (index: number) => {
		const selectedPackage = packages[index];
		console.log('selected package:', selectedPackage);
		if (selectedPackage.package_code.length === 0) {
			setIsCustom(true);

			setValue('dimensions.length', selectedPackage.dimensions.length);
			setValue('dimensions.width', selectedPackage.dimensions.width);
			setValue('dimensions.height', selectedPackage.dimensions.height);
			setValue('dimensions.unit', selectedPackage.dimensions.unit);
			setValue('weight.value', selectedPackage.weight.value);
			setValue('weight.unit', selectedPackage.weight.unit);
		}
		setDefaultPackageValues(selectedPackage);
	};

	return (
		<Box
			p={'.25vw'}
			w={'40rem'}
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
			{sender?.country_code !== reciever?.country_code ? <CustomsInfoForm /> : null}
			<PackageNumbers
				packages={packages}
				onSelectPackage={handleSelectPackage}
			/>
			<Flex
				gap={'2rem'}
				align={'center'}
				m={'1rem 0'}>
				<Button
					type="button"
					w={'20rem'}
					p={'.5rem'}
					bg={isPredefined ? 'cta' : 'gray.100'}
					color={isPredefined ? 'primary' : 'black'}
					onClick={() => {
						if (isCustom) setIsCustom(false);
						setIsPredefined((prev) => !prev);
					}}>
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
					Custom Dimension
				</Button>
			</Flex>

			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '1.5rem' }}>
				{isCustom ? (
					<>
						<Text fontWeight={'600'}>Custom Dimension (Length x Width x Height)</Text>
						<Flex
							gap={'2rem'}
							m={'1rem 0'}
							alignItems={'center'}>
							<FormControl isRequired>
								<NumberInput
									precision={2}
									max={70}>
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
									max={70}>
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
									max={70}>
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
									<option value={'ounce'}>ounce</option>
									<option value={'pound'}>pound</option>
									<option value={'kg'}>kg</option>
								</Select>
							</FormControl>

							<SubmitButton text="Save Details" />
						</Flex>
					</>
				) : isPredefined ? (
					<>
						<PredefinedBoxes />
					</>
				) : null}

				<Flex
					justify={'flex-end'}
					mt={'4rem'}
					gap={'1rem'}>
					<BackButton
						onClick={() => prevStep()}
						width="8rem"
					/>
					<RegularButton
						text="Continue"
						width="12rem"
						onClick={handleContinue}
						// isDisabled={packages.length === 0}
						error_message="You haven't added any package!"
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default PackageDetailsForm;
