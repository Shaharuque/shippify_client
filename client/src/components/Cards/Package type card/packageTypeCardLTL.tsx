import { Card, CardBody, Stack, Heading, Image } from '@chakra-ui/react';
import checked from '../../../assets/checked.png';
import { TPackageTypeCardLTLProps } from './packageType.interface';

const PackageTypeCardLTL = ({ text, image, code, onSelect, isSelected }: TPackageTypeCardLTLProps) => {
	return (
		<Card
			bg={'inherit'}
			pos={'relative'}
			_hover={{
				backgroundColor: '#e8edeb',
				cursor: 'pointer',
			}}
			onClick={() => onSelect(code)}>
			{isSelected && (
				<Image
					src={checked}
					color="green.500"
					position="absolute"
					top={2}
					left={2}
					boxSize={6}
				/>
			)}
			<CardBody>
				<Image
					src={image}
					borderRadius={'lg'}
					boxSize={'10rem'}
				/>

				<Stack
					mt="2"
					spacing="2">
					<Heading
						size="sm"
						textTransform={'capitalize'}
						textAlign={'center'}
						whiteSpace={'nowrap'}>
						{text}
					</Heading>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default PackageTypeCardLTL;
