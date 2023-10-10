import ShipmentCard from '../Cards/shipmentCard';
import { Flex, Stack, Text } from '@chakra-ui/react';

export interface IShipment {
	tableData: any;
	clickedCard: (cardId: string) => void;
	activeCard: string;
}

const ShipmentCardList = ({ tableData, clickedCard, activeCard }: IShipment) => {
	// console.log('tableData', tableData);

	return (
		<>
			{tableData && tableData?.length > 0 ? (
				<Flex
					flexWrap="wrap"
					h={'75vh'}
					mb={'2rem'}
					overflowY={'scroll'}>
					{tableData?.map((shipment: any, index: number) => {
						if (shipment.labelDetail) {
							return (
								<ShipmentCard
									clickedCard={clickedCard}
									key={index}
									shipment={shipment}
									isActive={activeCard === shipment?._id}
								/>
							);
						} else {
							return null;
						}
					})}
				</Flex>
			) : (
				<Stack align={'center'}>
					<Text
						textAlign={'center'}
						fontFamily={'Roboto'}
						fontWeight={'600'}>
						No Data Available
					</Text>
				</Stack>
			)}
		</>
	);
};

export default ShipmentCardList;
