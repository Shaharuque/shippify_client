import { Box, Flex, FormControl, Select, Text } from '@chakra-ui/react';
import PackageCard from '../Cards/packageCard';
import RegularButton from '../Buttons/regularButton';
import { useEffect, useState } from 'react';
import { TPredefinedBoxesProps, TPredefinedBox } from './predefinedBoxes.interface';
import { boxNameToImageDictionary } from '../../data/boxNameToImageDictionary';
import { useFetchPredefinedBoxDataQuery } from '../../redux/api/basicShipmentsApi';
import Error from '../Error bad request/error';
import SpinningLoader from '../Loader/spinningLoader';

const PredefinedBoxes = ({ inputChanged, editModeOn, selectedCode, weightValue, onPredefinedBoxCodeSelect, onPredefinedUnitChange, onPredefinedSubmit, onPredefinedWeightChange, removePackage }: TPredefinedBoxesProps) => {
	const { data, error, isLoading } = useFetchPredefinedBoxDataQuery();

	const [test, setTest] = useState<string | null>(null);
	const [predefinedBoxes, setPredefinedBoxes] = useState<TPredefinedBox[]>([]);

	useEffect(() => {
		setTest('');
		setTest(weightValue?.toString() || '');
	}, [weightValue]);

	console.log('test:', test);

	useEffect(() => {
		if (data) setPredefinedBoxes(Array.from(data?.data?.packages));
	}, [data]);

	return (
		<>
			{error ? (
				<Error />
			) : isLoading ? (
				<SpinningLoader />
			) : (
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
							min="0"
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
			)}
		</>
	);
};

export default PredefinedBoxes;
