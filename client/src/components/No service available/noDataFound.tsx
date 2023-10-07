import { Stack, Text, Image, Flex } from '@chakra-ui/react';
import alert from '../../assets/error.png';

import BackButton from '../Buttons/backButton';

type TNoDataFound = {
	text: string;
	backButton?: () => void;
};
const NoDataFound = ({ text, backButton }: TNoDataFound) => {
	return (
		<>
			<Stack
				align={'center'}
				direction={'row'}
				bg={'whitesmoke'}
				p={'1rem'}
				borderRadius={'1rem'}>
				<Text
					textAlign={'center'}
					fontFamily={'Roboto'}
					fontWeight={'600'}
					fontSize={'1.25rem'}>
					{text}
				</Text>
				<Image
					src={alert}
					boxSize={'2rem'}
				/>
			</Stack>

			{backButton ? (
				<Flex
					w={'15rem'}
					mt={'2rem'}
					justify={'flex-end'}>
					<BackButton
						width="7rem"
						text="Back"
						onClick={backButton!}
					/>
				</Flex>
			) : null}
		</>
	);
};

export default NoDataFound;
