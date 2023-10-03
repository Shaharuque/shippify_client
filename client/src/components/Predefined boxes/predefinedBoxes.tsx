import { Box, Flex, FormControl, Select, Text } from '@chakra-ui/react';
import smallBox from '../../assets/carton-box-removebg-preview.png';
import mediumBox from '../../assets/medium-box.png';
import largeBox from '../../assets/large-box.png';
import largerBox from '../../assets/larger-box.png';
import PackageCard from '../Cards/packageCard';
import RegularButton from '../Buttons/regularButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

const boxNameToImageDictionary: { [key: string]: string } = {
	'Laptop Box': smallBox,
	'Medium Box': mediumBox,
	'Large Box': largeBox,
	'Very Large Box': largerBox,
};

type TPredefinedBox = {
	description: string;
	dimensions: {
		width: number;
		height: number;
		length: number;
		unit: string;
	};
	name: string;
	package_code: string;
	package_id: string;
};

type TPredefinedBoxesProps = {
	inputChanged: boolean;
	editModeOn: boolean;
	selectedCode: string | null;
	weightValue: number | null;

	onPredefinedBoxCodeSelect: (code: string | null) => void;
	onPredefinedWeightChange: (weight: number | null) => void;
	onPredefinedUnitChange: (unit: string) => void;
	onPredefinedSubmit: () => void;
	removePackage: () => void;
};

const PredefinedBoxes = ({ inputChanged, editModeOn, selectedCode, weightValue, onPredefinedBoxCodeSelect, onPredefinedUnitChange, onPredefinedSubmit, onPredefinedWeightChange, removePackage }: TPredefinedBoxesProps) => {
	const [test, setTest] = useState<string | null>(null);
	const [predefinedBoxes, setPredefinedBoxes] = useState<TPredefinedBox[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setTest('');
		setTest(weightValue?.toString() || '');
	}, [weightValue]);

	console.log('test:', test);

	useEffect(() => {
		// const token = localStorage.getItem('token');
		const fetchPredefinedBoxData = async () => {
			try {
				const response = await axios.get('http://192.168.68.89:5000/custom-package-type/list', {
					headers: {
						'Content-Type': 'appliation/json',
					},
				});
				console.log('response from predefined box', response?.data);
				if (response?.data?.status === 'success') {
					setPredefinedBoxes(Array.from(response?.data?.data?.packages));
					setIsLoading(true);
				}
			} catch (error) {
				console.error('Error while fetching data', error);
			}
		};
		fetchPredefinedBoxData();
	}, []);

	return (
		<Box>
			<Flex
				gap={'.5rem'}
				align={'center'}
				m={'1rem 0'}>
				{predefinedBoxes?.map((box, index) => (
					<PackageCard
						key={index}
						isLoading={isLoading}
						text={box.name}
						dimension={`${box.dimensions.length} x ${box.dimensions.width} x ${box.dimensions.height}`}
						image={boxNameToImageDictionary[box.name]}
						code={box.package_code}
						isSelected={selectedCode === box.package_code}
						onSelect={() => onPredefinedBoxCodeSelect(box.package_code)}
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
				<input
					type="number"
					value={weightValue ? weightValue.toString() : ''}
					placeholder="Select weight"
					style={{
						border: '1px solid #002855',
						transition: 'all 0.30s ease-in-out',
						borderRadius: '0.5rem',
						padding: '0.4em 0.6em',
						outline: 'none',
						boxShadow: '0 0 3px rgba(0, 40, 85, 0.1)',
						backgroundColor: 'transparent',
						width: '80%',
					}}
					onChange={(e) => onPredefinedWeightChange(Number(e.target.value))}
				/>

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
				<Flex
					gap={'.75rem'}
					align={'center'}>
					<RegularButton
						onClick={removePackage}
						text="Remove"
						width="7rem"
						onHoverColor="#DC143C"
						isDisabled={!editModeOn}
					/>
					<RegularButton
						onClick={onPredefinedSubmit}
						width={'8rem'}
						isDisabled={!weightValue || weightValue === 0 || selectedCode?.length === 0 || selectedCode === null || !inputChanged}
						text={editModeOn ? 'Update' : 'Add package'}
					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default PredefinedBoxes;
