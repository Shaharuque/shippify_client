import { Box, Text, Flex, Circle } from '@chakra-ui/react';
import { TPackageDetailsForm } from '../Home page components/multiStepperForBasic/packageDetailsForm';
import { useState } from 'react';

const PackageNumbers = ({ packages, onSelectPackage }: { packages: TPackageDetailsForm[]; onSelectPackage: (index: number) => void }) => {
	const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);

	const handleSelectPackage = (index: number) => {
		setSelectedPackageIndex(index);
		onSelectPackage(index);
	};
	return (
		<Flex
			alignItems="center"
			mb={4}
			gap={'1rem '}>
			<Text
				as="b"
				fontSize="1.25rem"
				letterSpacing={0.2}
				mb={2}>
				Packages added:
			</Text>
			{packages.map((_, index) => (
				<Circle
					key={index}
					onClick={() => handleSelectPackage(index)}
					cursor="pointer"
					p={2}
					mb={2}
					size={'2.5rem'}
					fontWeight={'600'}
					bg={selectedPackageIndex === index ? 'cta' : 'white'}
					color={selectedPackageIndex === index ? 'primary' : '#28231D'}
					border={selectedPackageIndex === index ? 'none' : ' 1px solid #BDBDBD'}
					boxShadow={'0 10px 10px rgba(0, 0, 0, 0.1)'}>
					{index + 1}
				</Circle>
			))}
		</Flex>
	);
};

export default PackageNumbers;
