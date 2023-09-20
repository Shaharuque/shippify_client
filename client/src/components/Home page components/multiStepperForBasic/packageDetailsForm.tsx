import { Input, Box, Text, FormControl, FormLabel, Button, Select, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

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

const PackageDetailsForm = () => {
	const [isCustom, setIsCustom] = useState(false);
	const { control, handleSubmit } = useForm<PackageDetailsForm>();

	const onSubmit: SubmitHandler<PackageDetailsForm> = (data) => {
		console.log(data);
	};

	return (
		<Box p={'2vw'}>
			<Text
				as="b"
				fontSize={'1.25rem'}
				letterSpacing={0.2}>
				Package Details
			</Text>

			{isCustom ? (
				<form onSubmit={handleSubmit(onSubmit)}></form>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ marginTop: '1rem' }}>
					<Flex
						gap={'2rem'}
						align={'flex-end'}>
						<FormControl>
							<FormLabel>Choose Dimension</FormLabel>
							<Select>
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
				</form>
			)}

			{/* <form onSubmit={handleSubmit(onSubmit)}>
				{fields.map((item, index) => (
					<Box
						key={item.id}
						mb="4">
						<Text fontSize="lg">Package {index + 1}</Text>
						<FormControl mb="3">
							<FormLabel>Weight Unit</FormLabel>
							<Controller
								name={`packages.${index}.weight.unit`}
								control={control}
								defaultValue=""
								render={({ field }) => <Input {...field} />}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Weight Value</FormLabel>
							<Controller
								name={`packages.${index}.weight.value`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<Input
										type="number"
										{...field}
									/>
								)}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Dimensions Unit</FormLabel>
							<Controller
								name={`packages.${index}.dimensions.unit`}
								control={control}
								defaultValue=""
								render={({ field }) => <Input {...field} />}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Height</FormLabel>
							<Controller
								name={`packages.${index}.dimensions.height`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<Input
										type="number"
										{...field}
									/>
								)}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Width</FormLabel>
							<Controller
								name={`packages.${index}.dimensions.width`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<Input
										type="number"
										{...field}
									/>
								)}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Length</FormLabel>
							<Controller
								name={`packages.${index}.dimensions.length`}
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<Input
										type="number"
										{...field}
									/>
								)}
							/>
						</FormControl>
						<FormControl mb="3">
							<FormLabel>Package Code</FormLabel>
							<Controller
								name={`packages.${index}.package_code`}
								control={control}
								defaultValue=""
								render={({ field }) => <Input {...field} />}
							/>
						</FormControl>
						<Button
							colorScheme="red"
							onClick={() => remove(index)}>
							Remove Package
						</Button>
					</Box>
				))}

				<Flex gap={'1rem'}>
					<Button
						onClick={() =>
							append({
								weight: {
									unit: 'kg',
									value: 0,
								},
								dimensions: {
									unit: 'cm',
									height: 0,
									width: 0,
									length: 0,
								},
								package_code: '',
							})
						}
						mb="4">
						Add Package
					</Button>

					<Button type="submit">Submit</Button>
				</Flex>
			</form> */}
		</Box>
	);
};

export default PackageDetailsForm;
