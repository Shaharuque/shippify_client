import { Box, Button, Flex, FormControl, FormLabel, NumberInput, NumberInputField, Select } from '@chakra-ui/react';
import smallbox from '../../assets/carton-box-removebg-preview.png';
import mediumbox from '../../assets/medium-box.png';
import largebox from '../../assets/large-box.png';
import largerbox from '../../assets/larger-box.png';
import PackageCard from '../Cards/packageCard';
import { useState } from 'react';

const predefinedBoxes = [
	{ text: 'small box', dimensions: '4 X 10 X 1 inches', image: smallbox, code: 'zaber' },
	{ text: 'medium box', dimensions: '4 X 10 X 1 inches', image: mediumbox, code: 'amin' },
	{ text: 'large box', dimensions: '4 X 10 X 1 inches', image: largebox, code: 'tonmoy' },
	{ text: 'very large box', dimensions: '4 X 10 X 1 inches', image: largerbox, code: 'zakir' },
];

const PredefinedBoxes = () => {
	const [selectedPackageCode, setSelectedPackageCode] = useState<string | null>(null);
	const [weight, setWeight] = useState(0);
	const [unit, setUnit] = useState('pound');

	const handleSelectPackage = (code: string) => {
		if (selectedPackageCode === code) {
			setSelectedPackageCode(null);
		} else {
			setSelectedPackageCode(code);
		}
	};

	const handleButtonClick = () => {
		console.log('weight:', weight);
		console.log('unit:', unit);
	};

	return (
		<Box>
			<Flex
				gap={'.5rem'}
				align={'center'}
				m={'1rem 0'}>
				{predefinedBoxes.map((box, index) => (
					<PackageCard
						key={index}
						text={box.text}
						dimension={box.dimensions}
						image={box.image}
						code={box.code}
						isSelected={selectedPackageCode === box.code}
						onSelect={() => handleSelectPackage(box.code)}
					/>
				))}
			</Flex>

			<Flex
				gap={'2rem'}
				alignItems={'center'}
				mt={'2rem'}>
				<FormControl>
					<FormLabel>Weight</FormLabel>
					<NumberInput
						id="weight.value"
						defaultValue={0}
						step={1}
						precision={2}
						min={0}>
						<NumberInputField
							placeholder="Weight"
							border={'1px solid #314866'}
							transition={'all 0.30s ease-in-out;'}
							_focusVisible={{
								borderColor: '#002855',
								boxShadow: '0 0 3px #002855 ',
							}}
							onChange={(e) => setWeight(Number(e.target.value))}
						/>
					</NumberInput>
				</FormControl>

				<FormControl mt={'2rem'}>
					<Select
						id="weight.unit"
						defaultValue={'pound'}
						border={'1px solid #314866'}
						transition={'all 0.30s ease-in-out;'}
						_focusVisible={{
							borderColor: '#002855',
						}}
						onChange={(e) => setUnit(e.target.value)}>
						<option value={'ounce'}>ounce</option>
						<option value={'pound'}>pound</option>
						<option value={'kg'}>kg</option>
					</Select>
				</FormControl>
				<Button
					onClick={handleButtonClick}
					type="button"
					bg={'cta'}
					w={'25rem'}
					color={'primary'}
					borderRadius={'2rem'}
					mt={'2rem'}>
					Save Details
				</Button>
			</Flex>
		</Box>
	);
};

export default PredefinedBoxes;
