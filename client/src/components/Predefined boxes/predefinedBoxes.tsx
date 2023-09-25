import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react';
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

	const handleSelectPackage = (code: string) => {
		if (selectedPackageCode === code) {
			setSelectedPackageCode(null);
		} else {
			setSelectedPackageCode(code);
		}
	};
	return (
		<Box>
			<Flex
				gap={'.5rem'}
				align={'center'}
				mb={'1rem'}>
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
			<FormControl>
				<FormLabel>Weight</FormLabel>
			</FormControl>
		</Box>
	);
};

export default PredefinedBoxes;
