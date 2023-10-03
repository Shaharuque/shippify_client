import { Text, Flex, Circle } from '@chakra-ui/react';
import { TPackageDetailsForm } from '../Basic shipment/multiStepperForBasic/packageDetailsForm';
import { TPackageDetailsFormLTL } from '../LTL shipment/Multi stepper for LTL/packageDetailsFormLTL';

const PackageNumbers = ({ packages, onSelectPackage, selectedPackageIndex }: { packages: TPackageDetailsForm[] | TPackageDetailsFormLTL[]; onSelectPackage: (index: number) => void; selectedPackageIndex: number | null }) => {
	return (
		<Flex
			direction={'column'}
			mb={'1rem '}>
			{packages.length > 0 ? (
				<Flex
					alignItems="center"
					mb={3}
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
							onClick={() => onSelectPackage(index)}
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
			) : null}
			{packages.length >= 1 ? <Text fontSize={'.85rem'}>*You can add more packages</Text> : null}
		</Flex>
	);
};

export default PackageNumbers;
