import { Flex, Stack, Text } from '@chakra-ui/react';
import ShipmentCardLTL from '../Cards/shipmentCardLTL';

export interface IShipment {
	tableData: any;
	clickedCard: (cardId: any) => void;
	activeCard: string;
}
const ShipmentCardList = ({ tableData, clickedCard, activeCard }: IShipment) => {
	// console.log('tableData', tableData);

	return (
		<>
			{tableData && tableData?.length > 0 ? (
				<Flex
					flexWrap="wrap"
					gap={'1vw'}
					// h={'73vh'}
					mb={'2rem'}
					overflowY={'scroll'}
					css={{
						'&::-webkit-scrollbar': {
							width: '0',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '0.25em',
						},
					}}>
					{tableData?.map((shipment: any, index: number) => {
						if (shipment.blockChainHash) {
							return (
								<ShipmentCardLTL
									clickedCard={clickedCard}
									key={index}
									shipment={shipment}
									isActive={activeCard == shipment?._id}
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
