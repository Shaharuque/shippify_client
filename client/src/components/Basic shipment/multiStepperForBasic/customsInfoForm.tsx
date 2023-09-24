import { Box, Flex, FormControl, Input, Select, Text, Button, useNumberInput, HStack } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { useAppDispatch } from '../../../redux/hooks';
import { updateField } from '../../../redux/features/shipmentsSlice';

export type TCustomsDetailsForm = {
	contents: 'merchandise' | 'gift' | 'returned_goods' | 'documents' | 'other';
	contents_explanation?: string;
	non_delivery: 'treat_as_abandoned' | 'return_to_sender';
	customs_items: ICustomsItem[];
};

export interface ICustomsItem {
	harmonized_tariff_code: string;
	country_of_manufacture: string;
	country_of_origin: string;
	description: string;
	quantity: number;
	value: {
		currency: string;
		amount: number;
	};
}

const defaultCustomsValues: TCustomsDetailsForm = {
	contents: 'merchandise',
	non_delivery: 'treat_as_abandoned',
	customs_items: [
		{
			harmonized_tariff_code: '0910.99.50',
			country_of_manufacture: 'US',
			country_of_origin: 'US',
			description: '',
			quantity: 0,
			value: {
				currency: 'usd',
				amount: 0,
			},
		},
	],
};

const CustomsInfoForm = () => {
	const { control, handleSubmit, reset } = useForm<TCustomsDetailsForm>({ defaultValues: defaultCustomsValues });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'customs_items',
	});

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
		step: 1,
		defaultValue: 1,
		min: 1,
		max: 6,
	});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<TCustomsDetailsForm> = (data) => {
		console.log('customs info:', data);
		dispatch(updateField({ customs: data }));
	};

	return (
		<Flex
			mb={'1rem'}
			direction={'column'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}
				mb={'1rem'}>
				Customs Details
			</Text>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex
					gap={'1rem'}
					align={'center'}>
					<FormControl
						isRequired
						mb={'1rem'}>
						<Controller
							name="contents"
							control={control}
							render={({ field }) => (
								<Select {...field}>
									<option value={'merchandise'}>Merchandise</option>
									<option value={'gift'}>Gift</option>
									<option value={'returned_goods'}>Returned Goods</option>
									<option value={'documents'}>Documents</option>
									<option value={'other'}>Other</option>
								</Select>
							)}
						/>
					</FormControl>

					<FormControl mb={'1rem'}>
						<Controller
							name="non_delivery"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									placeholder="Return policy">
									<option value={'treat_as_abandoned'}>Abandon goods</option>
									<option value={'return_to_sender'}>Return goods</option>
								</Select>
							)}
						/>
					</FormControl>
				</Flex>
				<>
					{fields.map((item, index) => (
						<Box
							key={item.id}
							mb={'1rem'}>
							{/* <Text
								as="b"
								fontSize={'1rem'}
								letterSpacing={0.2}>
								Customs Item {index + 1}
							</Text> */}
							<Flex
								gap={'1rem'}
								mb={'1rem'}>
								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.description`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												type="text"
												placeholder="Description"
											/>
										)}
									/>
								</FormControl>

								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.harmonized_tariff_code`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												type="text"
												placeholder="Harmonized Tariff Code"
											/>
										)}
									/>
								</FormControl>
							</Flex>

							<Flex
								gap={'1rem'}
								mb={'1rem'}>
								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.country_of_origin`}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												placeholder="Country of origin">
												<option value={'US'}>United States</option>
												<option value={'GB'}>United Kingdom</option>
												<option value={'CA'}>Canada</option>
											</Select>
										)}
									/>
								</FormControl>

								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.country_of_manufacture`}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												placeholder="Country of manufacture">
												<option value={'US'}>United States</option>
												<option value={'GB'}>United Kingdom</option>
												<option value={'CA'}>Canada</option>
											</Select>
										)}
									/>
								</FormControl>
							</Flex>

							<Flex
								gap={'1rem'}
								mb={'1rem'}>
								<FormControl mt={'1rem'}>
									<HStack>
										{/* <Button {...inc}>+</Button> */}

										<Controller
											name={`customs_items.${index}.quantity`}
											control={control}
											render={({ field }) => (
												<Input
													{...field}
													// {...input}
												/>
											)}
										/>
										{/* <Button {...dec}>-</Button> */}
									</HStack>
								</FormControl>

								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.value.amount`}
										control={control}
										render={({ field }) => (
											<Input
												{...field}
												type="text"
												placeholder={'Price'}
											/>
										)}
									/>
								</FormControl>

								<FormControl mt={'1rem'}>
									<Controller
										name={`customs_items.${index}.value.currency`}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												placeholder="Curerncy">
												<option value={'usd'}>Dollars</option>
												<option value={'gbp'}>Pounds</option>
												<option value={'cad'}>Canadian Dollars</option>
											</Select>
										)}
									/>
								</FormControl>
							</Flex>
						</Box>
					))}
				</>
				<Flex
					justify={'flex-end'}
					gap={'1rem'}>
					<Button
						type="button"
						bg={'cta'}
						color={'primary'}
						onClick={() =>
							append({
								description: '',
								harmonized_tariff_code: '',
								country_of_manufacture: '',
								country_of_origin: '',
								quantity: 0,
								value: {
									amount: 0,
									currency: '',
								},
							})
						}>
						Add Customs Item
					</Button>

					<Button
						type="submit"
						bg={'cta'}
						color={'primary'}>
						Submit
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default CustomsInfoForm;
