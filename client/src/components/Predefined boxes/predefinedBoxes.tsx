import { Box, Flex, FormControl, NumberInput, Select, Text } from '@chakra-ui/react';
import smallbox from '../../assets/carton-box-removebg-preview.png';
import mediumbox from '../../assets/medium-box.png';
import largebox from '../../assets/large-box.png';
import largerbox from '../../assets/larger-box.png';
import PackageCard from '../Cards/packageCard';
import RegularButton from '../Buttons/regularButton';
import { useEffect, useState } from 'react';

const predefinedBoxes = [
	{ text: 'small box', dimensions: '4 X 10 X 1 inches', image: smallbox, code: 'zaber' },
	{ text: 'medium box', dimensions: '6 X 12 X 3 inches', image: mediumbox, code: 'amin' },
	{ text: 'large box', dimensions: '8 X 16 X 6 inches', image: largebox, code: 'tonmoy' },
	{ text: 'very large box', dimensions: '10 X 20 X 10 inches', image: largerbox, code: 'zakir' },
];

type TPredefinedBoxesProps = {
	inputChanged: boolean;
	editModeOn: boolean;
	selectedCode: string | null;
	weightValue: number | null;
	unit: string;
	onPredefinedBoxCodeSelect: (code: string | null) => void;
	onPredefinedWeightChange: (weight: number | null) => void;
	onPredefinedUnitChange: (unit: string) => void;
	onPredefinedSubmit: () => void;
};

const PredefinedBoxes = ({ inputChanged, editModeOn, selectedCode, weightValue, unit, onPredefinedBoxCodeSelect, onPredefinedUnitChange, onPredefinedSubmit, onPredefinedWeightChange }: TPredefinedBoxesProps) => {
	const [test, setTest] = useState<string | null>(null);

	useEffect(() => {
		setTest('');
		setTest(weightValue?.toString() || '');
	}, [weightValue]);

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
						isSelected={selectedCode === box.code}
						onSelect={() => onPredefinedBoxCodeSelect(box.code)}
					/>
				))}
			</Flex>

			<Text
				m={'2rem 0 .5rem 0'}
				fontWeight={'600'}>
				Weight
			</Text>
			<Flex
				gap={'2rem'}
				alignItems={'center'}>
				<FormControl>
					<NumberInput
						id="weight.value"
						step={1}
						precision={2}
						min={0}>
						{/* <NumberInputField
							value={test}
							placeholder="Weight"
							border={'1px solid #002855'}
							transition={'all 0.30s ease-in-out'}
							borderRadius={'0.25em'}
							padding={'0.4em 0.6em'}
							outline={'none'}
							boxShadow={'0 0 3px rgba(0, 40, 85, 0.1)'}
							backgroundColor={'transparent'}
							onChange={(e) => {
								const value = e.target.value;
								setTest(value);
								onPredefinedWeightChange(Number(value));
							}}
						/> */}

						<input
							type="number"
							value={weightValue ? weightValue.toString() : ''}
							placeholder="Select weight"
							style={{
								border: '1px solid #002855',
								transition: 'all 0.30s ease-in-out',
								borderRadius: '0.25em',
								padding: '0.4em 0.6em',
								outline: 'none',
								boxShadow: '0 0 3px rgba(0, 40, 85, 0.1)',
								backgroundColor: 'transparent',
							}}
							onChange={(e) => onPredefinedWeightChange(Number(e.target.value))}
						/>
					</NumberInput>
				</FormControl>

				<FormControl>
					<Select
						id="weight.unit"
						defaultValue={'pound'}
						border={'1px solid #314866'}
						transition={'all 0.30s ease-in-out;'}
						_focusVisible={{
							borderColor: '#002855',
						}}
						onChange={(e) => onPredefinedUnitChange(e.target.value)}>
						<option value={'ounce'}>ounce</option>
						<option value={'pound'}>pound</option>
						<option value={'kg'}>kg</option>
					</Select>
				</FormControl>
				<RegularButton
					onClick={onPredefinedSubmit}
					width={'10rem'}
					isDisabled={!weightValue || weightValue === 0 || selectedCode?.length === 0 || selectedCode === null || !inputChanged}
					text={editModeOn ? 'Update' : 'Add package'}
				/>
			</Flex>
		</Box>
	);
};

export default PredefinedBoxes;
