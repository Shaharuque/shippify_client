import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import checked from '../../assets/checked.png';

type PackageCardProps = {
	text: string;
	dimension: string;
	image: string;
	code: string | null;
	onSelect: (code: string | null) => void;
	isSelected: boolean;
	isLoading: boolean;
};

const PackageCard = ({ text, dimension, image, code, onSelect, isSelected, isLoading }: PackageCardProps) => {
	console.log('loading state:', isLoading);
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
						whiteSpace={'nowrap'}>
						{text}
					</Heading>
					<Text
						textTransform={'capitalize'}
						fontSize={'.80rem'}
						whiteSpace={'nowrap'}>
						{dimension}
					</Text>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default PackageCard;
