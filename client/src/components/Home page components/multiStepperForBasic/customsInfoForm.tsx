import { Box, Flex, FormControl, Input, Select, Switch, Text } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export type TCustomsDetailsForm = {
	contents: 'merchandise' | 'gift' | 'returned_goods' | 'documents' | 'sample' | 'other';
	contents_explanation?: string;
	non_delivery: 'treat_as_abandoned' | 'return_to_sender';
	customs_items: CustomsItem[];
};

export interface CustomsItem {
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
			description: '0',
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

	const onSubmit: SubmitHandler<TCustomsDetailsForm> = (data) => {
		console.log('customs info:', data);
	};
	return (
		<Box
			mb={'1rem'}
			display={'flex'}
			flexDirection={'column'}>
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
								<Switch
									{...field}
									size={'md'}
									colorScheme="teal"
								/>
							)}
						/>
					</FormControl>
				</Flex>
				<Flex gap={'1rem'}>
					{/* <FormControl>
						<Controller
							name="customs_items.description"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									type="textarea"
								/>
							)}
						/>
					</FormControl> */}
				</Flex>
			</form>
		</Box>
	);
};

export default CustomsInfoForm;
