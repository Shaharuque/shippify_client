import { Box, Text, FormControl, Button, Select, Flex, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputStepper } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import SubmitButton from '../../Buttons/submitButton';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';

export type PackageDetailsForm = {
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

const defaultValues: PackageDetailsForm = {
	weight: {
		unit: 'inch',
		value: 0.0,
	},
	dimensions: {
		unit: 'pound',
		length: 0.0,
		width: 0.0,
		height: 0.0,
	},
	package_code: '',
};

const PackageDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [isCustom, setIsCustom] = useState(false);
	const [packages, setPackages] = useState<PackageDetailsForm[]>([]);

	const { control, handleSubmit } = useForm<PackageDetailsForm>({ defaultValues });

	const onSubmit: SubmitHandler<PackageDetailsForm> = (data) => {
		console.log(data);
		setPackages([...packages, data]);
		setIsCustom(!isCustom);
	};

	const handleSaveAndContinue = () => {
		console.log('packages:', packages);
	};

	return (
		<Box
			p={'2vw'}
			w={'40rem'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Package Details
			</Text>

			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ marginTop: '1.5rem' }}>
				{isCustom ? (
					<>
						<Text fontWeight={'600'}>Custom Dimension</Text>
						<Flex
							gap={'2rem'}
							m={'1rem 0'}
							alignItems={'center'}>
							<FormControl isRequired>
								<Controller
									name="dimensions.length"
									control={control}
									render={({ field }) => (
										<NumberInput
											precision={2}
											max={70}>
											<NumberInputField
												{...field}
												placeholder="Length"
												border={'1px solid #314866'}
												transition={'all 0.30s ease-in-out;'}
												_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									)}
								/>
							</FormControl>
							x
							<FormControl isRequired>
								<Controller
									name="dimensions.width"
									control={control}
									render={({ field }) => (
										<NumberInput
											precision={2}
											max={70}>
											<NumberInputField
												{...field}
												placeholder="Width"
												border={'1px solid #314866'}
												transition={'all 0.30s ease-in-out;'}
												_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									)}
								/>
							</FormControl>
							x
							<FormControl isRequired>
								<Controller
									name="dimensions.height"
									control={control}
									render={({ field }) => (
										<NumberInput
											precision={2}
											max={70}>
											<NumberInputField
												{...field}
												placeholder="Height"
												border={'1px solid #314866'}
												transition={'all 0.30s ease-in-out;'}
												_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}
											/>
											<NumberInputStepper>
												<NumberIncrementStepper />
												<NumberDecrementStepper />
											</NumberInputStepper>
										</NumberInput>
									)}
								/>
							</FormControl>
							<FormControl>
								<Controller
									name="dimensions.unit"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											border={'1px solid #314866'}
											transition={'all 0.30s ease-in-out;'}
											_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}>
											<option value={'inch'}>inch</option>
											<option value={'cm'}>cm</option>
										</Select>
									)}
								/>
							</FormControl>
						</Flex>
					</>
				) : (
					<Flex
						gap={'2rem'}
						alignItems={'center'}
						m={'1rem 0'}>
						<FormControl isRequired>
							<Select
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								placeholder="Choose Dimension"
								_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}>
								<option>4 x 4 x 4 inches</option>
								<option>6 x 6 x 6 inches</option>
								<option>8 x 8 x 8 inches</option>
								<option>10 x 10 x 10 inches</option>
							</Select>
						</FormControl>
						<Text>or</Text>
						<Button
							type="button"
							w={'20rem'}
							p={'.5rem'}
							onClick={() => setIsCustom(!isCustom)}>
							Custom Dimension
						</Button>
					</Flex>
				)}
				<Text fontWeight={'600'}>Weight</Text>

				<Flex
					gap={'2rem'}
					alignItems={'center'}
					m={'1rem 0'}>
					<FormControl isRequired>
						<Controller
							name="weight.value"
							control={control}
							render={({ field }) => (
								<NumberInput
									precision={2}
									max={150}>
									<NumberInputField
										{...field}
										placeholder="Weight"
										border={'1px solid #314866'}
										transition={'all 0.30s ease-in-out;'}
										_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}
									/>
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							)}
						/>
					</FormControl>
					<FormControl>
						<Controller
							name="weight.unit"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									border={'1px solid #314866'}
									transition={'all 0.30s ease-in-out;'}
									_focusVisible={{ borderColor: '#002855', boxShadow: '0 0 3px #002855 ' }}>
									<option value={'ounce'}>ounce</option>
									<option value={'pound'}>pound</option>
									<option value={'kg'}>kg</option>
								</Select>
							)}
						/>
					</FormControl>

					<SubmitButton text="Add another" />
				</Flex>
				<Flex
					justify={'flex-end'}
					m={'2rem 0'}
					gap={'1rem'}>
					<BackButton
						onClick={() => prevStep}
						width="8rem"
					/>
					<RegularButton
						text="Save and Continue"
						width="12rem"
						onClick={handleSaveAndContinue}
					/>
				</Flex>
			</form>
		</Box>
	);
};

export default PackageDetailsForm;
