import { Flex, FormControl, Input, Select, Text, Button, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateField } from '../../../redux/features/basicShipmentsSlice';
import SubmitButton from '../../Buttons/submitButton';
import CustomsInfoNumber from '../../Custom infos/customInfoNumbers';
import { RootState } from '../../../redux/store';
import { useState } from 'react';

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
	quantity: number | null;
	value: {
		currency: string;
		amount: number | null;
	};
}

const defaultCustomsValues: TCustomsDetailsForm = {
	contents: 'merchandise',
	non_delivery: 'treat_as_abandoned',
	customs_items: [
		{
			harmonized_tariff_code: '0910.99.50',
			country_of_manufacture: '',
			country_of_origin: '',
			description: '',
			quantity: null,
			value: {
				currency: 'usd',
				amount: null,
			},
		},
	],
};

const CustomsInfoForm = () => {
	const { handleSubmit, reset, setValue, register } = useForm<ICustomsItem>({ defaultValues: { ...defaultCustomsValues?.customs_items[0] } });
	const customItemsInfo = useAppSelector((state: RootState) => state?.basicShipments?.customs?.customs_items);
	const contentsFromStore = useAppSelector((state: RootState) => state?.basicShipments?.customs?.contents);
	const returnPolicyFromStore = useAppSelector((state: RootState) => state?.basicShipments?.customs?.non_delivery);

	const dispatch = useAppDispatch();

	const [contents, setContents] = useState('' || contentsFromStore);
	const [returnPolicy, setReturnPolicy] = useState('' || returnPolicyFromStore);
	const [selectedCustomItemInfoIndex, setSelectedCustomItemInfoIndex] = useState<number | null>(null);
	const [addNew, setAddNew] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const onSubmit: SubmitHandler<ICustomsItem> = (data) => {
		//need to moodify data on submit.
		// console.log('customs info:', data);
		// console.log('custom_items', customItemsInfo);

		if (customItemsInfo && customItemsInfo?.length > 0) {
			if (editMode) {
				const updateCustomItems = [...customItemsInfo];
				updateCustomItems[selectedCustomItemInfoIndex!] = data;
				const newCustoms = { contents, non_delivery: returnPolicy, customs_items: updateCustomItems };
				dispatch(updateField({ customs: newCustoms }));
			} else {
				const newItems = [...customItemsInfo, data];
				const newCustoms = { contents, non_delivery: returnPolicy, customs_items: newItems };
				dispatch(updateField({ customs: newCustoms }));
			}
		} else {
			const newCustoms = { contents, non_delivery: returnPolicy, customs_items: [data] };
			dispatch(updateField({ customs: newCustoms }));
		}
		CustomReset();
	};

	const handleSelectCustomItemInfo = (index: number) => {
		const selectedItem = customItemsInfo![index];
		setSelectedCustomItemInfoIndex(index);

		console.log('index', index, selectedCustomItemInfoIndex);

		console.log('selectedItem', selectedItem);
		setValue('country_of_manufacture', selectedItem?.country_of_manufacture);
		setValue('country_of_origin', selectedItem?.country_of_origin);
		setValue('harmonized_tariff_code', selectedItem?.harmonized_tariff_code);
		setValue('description', selectedItem?.description);
		setValue('quantity', selectedItem?.quantity);
		setValue('value.amount', selectedItem?.value?.amount);
		setValue('value.currency', selectedItem?.value?.currency);

		setAddNew(true);
		setEditMode(true);
	};

	const handleRemove = () => {
		const updatedCustomItems = customItemsInfo?.filter((_, index) => index !== selectedCustomItemInfoIndex);
		const newCustoms = { contents, non_delivery: returnPolicy, customs_items: updatedCustomItems };
		dispatch(updateField({ customs: newCustoms }));
		CustomReset();
	};

	const CustomReset = () => {
		reset({ ...defaultCustomsValues?.customs_items[0] });
		setSelectedCustomItemInfoIndex(null);
		setAddNew(false);
		setEditMode(false);
	};

	return (
		<Flex
			mb={'2rem'}
			direction={'column'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}
				mb={'1rem'}>
				Customs Details
			</Text>

			<Flex
				gap={'1rem'}
				align={'center'}>
				<FormControl
					isRequired
					mb={'1rem'}>
					<Select
						border={'1px solid #314866'}
						transition={'all 0.30s ease-in-out;'}
						_focusVisible={{
							borderColor: '#002855',
						}}
						value={contents}
						onChange={(e) => setContents(e.target.value as 'merchandise' | 'gift' | 'returned_goods' | 'documents' | 'other' | undefined)}
						placeholder={'Select content type'}>
						<option value={'merchandise'}>Merchandise</option>
						<option value={'gift'}>Gift</option>
						<option value={'returned_goods'}>Returned Goods</option>
						<option value={'documents'}>Documents</option>
						<option value={'other'}>Other</option>
					</Select>
				</FormControl>

				<FormControl
					mb={'1rem'}
					isRequired>
					<Select
						border={'1px solid #314866'}
						transition={'all 0.30s ease-in-out;'}
						_focusVisible={{
							borderColor: '#002855',
						}}
						value={returnPolicy}
						placeholder="Return policy"
						onChange={(e) => setReturnPolicy(e.target.value as 'treat_as_abandoned' | 'return_to_sender' | undefined)}>
						<option value={'treat_as_abandoned'}>Abandon goods</option>
						<option value={'return_to_sender'}>Return goods</option>
					</Select>
				</FormControl>
			</Flex>

			<form onSubmit={handleSubmit(onSubmit)}>
				<CustomsInfoNumber
					customItemsInfo={customItemsInfo}
					onSelectCustomItemInfo={handleSelectCustomItemInfo}
					selectedCustomItemInfoIndex={selectedCustomItemInfoIndex}
				/>
				<Flex
					gap={'1rem'}
					mb={'1rem'}>
					<FormControl
						mt={'1rem'}
						isRequired>
						<Input
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}
							{...register('description')}
							type="text"
							placeholder="Description"
						/>
					</FormControl>

					<FormControl
						mt={'1rem'}
						isRequired>
						<Input
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}
							{...register(`harmonized_tariff_code`)}
							type="text"
							placeholder="Tariff Code"
						/>
					</FormControl>
				</Flex>

				<Flex
					gap={'1rem'}
					mb={'1rem'}>
					<FormControl
						mt={'1rem'}
						isRequired>
						<Select
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
							}}
							{...register(`country_of_origin`)}
							placeholder="Country of origin">
							<option value={'US'}>United States</option>
							<option value={'GB'}>United Kingdom</option>
							<option value={'CA'}>Canada</option>
						</Select>
					</FormControl>

					<FormControl
						mt={'1rem'}
						isRequired>
						<Select
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
							}}
							{...register(`country_of_manufacture`)}
							placeholder="Country of manufacture">
							<option value={'US'}>United States</option>
							<option value={'GB'}>United Kingdom</option>
							<option value={'CA'}>Canada</option>
						</Select>
					</FormControl>
				</Flex>

				<Flex
					gap={'1rem'}
					mb={'1rem'}>
					<FormControl mt={'1rem'}>
						<NumberInput
							min={0}
							max={20000}>
							<NumberInputField
								{...register(`quantity`)}
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
									boxShadow: '0 0 3px #002855 ',
								}}
								placeholder="Quantity"
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>

					<FormControl
						mt={'1rem'}
						isRequired>
						<NumberInput
							min={0}
							max={20000}>
							<NumberInputField
								border={'1px solid #314866'}
								transition={'all 0.30s ease-in-out;'}
								_focusVisible={{
									borderColor: '#002855',
									boxShadow: '0 0 3px #002855 ',
								}}
								{...register(`value.amount`)}
								type="text"
								placeholder={'Price'}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>

					<FormControl
						mt={'1rem'}
						isRequired>
						<Select
							{...register(`value.currency`)}
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
							}}
							placeholder="Currency">
							<option value={'usd'}>Dollars</option>
							<option value={'gbp'}>Pounds</option>
							<option value={'cad'}>Canadian Dollars</option>
						</Select>
					</FormControl>
				</Flex>

				<Flex
					justify={'space-between'}
					align={'center'}
					direction={'row-reverse'}
					mt={'2rem'}>
					<Flex gap={'1rem'}>
						<SubmitButton
							text={editMode ? 'Update' : 'Add item'}
							width="8rem"
						/>
						<Button
							onClick={handleRemove}
							borderRadius={'1rem'}
							_hover={{ bg: 'red.400', color: 'white' }}>
							Remove
						</Button>
					</Flex>
					{addNew ? (
						<Button
							type="button"
							bg={'cta'}
							color={'primary'}
							onClick={() => CustomReset()}>
							Add new
						</Button>
					) : null}
				</Flex>
			</form>
		</Flex>
	);
};

export default CustomsInfoForm;
