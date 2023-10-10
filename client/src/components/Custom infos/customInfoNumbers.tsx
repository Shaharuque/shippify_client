import { Text, Flex, Circle } from '@chakra-ui/react';
import { ICustomsItem } from '../Basic shipment/multiStepperForBasic/customsInfoForm';

type TCustomsInfoNumberProps = {
	customItemsInfo?: ICustomsItem[];
	onSelectCustomItemInfo: (index: number) => void;
	selectedCustomItemInfoIndex: number | null;
};

const CustomsInfoNumber = ({ customItemsInfo, onSelectCustomItemInfo, selectedCustomItemInfoIndex }: TCustomsInfoNumberProps) => {
	// console.log('custom_items', customItemsInfo);
	return (
		<Flex
			direction={'column'}
			mb={'1rem '}>
			{customItemsInfo && customItemsInfo?.length > 0 ? (
				<Flex
					alignItems="center"
					mb={3}
					gap={'1rem '}>
					<Text
						as="b"
						fontSize="1.25rem"
						letterSpacing={0.2}
						mb={2}>
						Customs Item added:
					</Text>
					{customItemsInfo?.map((_, index) => (
						<Circle
							key={index}
							onClick={() => onSelectCustomItemInfo(index)}
							cursor="pointer"
							p={2}
							mb={2}
							size={'2.5rem'}
							fontWeight={'600'}
							bg={selectedCustomItemInfoIndex === index ? 'cta' : 'white'}
							color={selectedCustomItemInfoIndex === index ? 'primary' : '#28231D'}
							border={selectedCustomItemInfoIndex === index ? 'none' : ' 1px solid #BDBDBD'}
							boxShadow={'0 10px 10px rgba(0, 0, 0, 0.1)'}>
							{index + 1}
						</Circle>
					))}
				</Flex>
			) : null}
			{customItemsInfo && customItemsInfo?.length >= 1 ? <Text fontSize={'.85rem'}>*You can add more customs info</Text> : null}
		</Flex>
	);
};

export default CustomsInfoNumber;
