import { Flex, Image } from '@chakra-ui/react';

const RateCard = () => {
	return (
		<Flex justify={'space-between'}>
			<Flex direction={'column'}>
				<Flex>
					<Image />
				</Flex>
			</Flex>
			<Flex direction={'column'}></Flex>
		</Flex>
	);
};

export default RateCard;
