import React from 'react';
import { Badge, Box, Button, Flex, Image, Stack, Text, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import BlockChainModal from '../Modal/BlockChainModal';
import ups from '../../../assets/ups.svg';
import fedex from '../../../assets/fedex-express-6.svg';
import stamps from '../../../assets/stamps_com.png';

interface TrackingItemProps {
    item: any;
    isActive: boolean;
    clickedCard: (cardId: string) => void;
    // isOpen: boolean;
    // onClose: () => void;
    onOpen: () => void;
}
const LtlCard: React.FC<TrackingItemProps> = ({ item, clickedCard, isActive, onOpen }) => {

    const redirectToEtherScan=()=>{
        window.open(`https://goerli.etherscan.io/tx/${item?.blockChainHash}`, '_blank');
    }

    console.log(item?.shipment_detail?.shipment?.ship_from?.address?.city_locality)

    return (
        <Box
            borderRadius="md"
            p={4}
            marginBottom={4}
            boxShadow="lg"
            cursor={'pointer'}
        // _hover={{
        // 	backgroundColor: '#437F8C',
        // 	color: 'white',
        // }}
        // w={'40%'}

        >

            <Flex gap={'2rem'}>
            <Stack
					align={'center'}
					w={'120px'}
					textAlign={'center'}
                    justify={'center'}>
					<Image
						src={item?.rateDetail?.carrier_code === 'ups' ? ups : item?.rateDetail?.carrier_code === 'fedex' ? fedex : stamps}
						boxSize={'2.5rem'}
					/>

					<Text
						fontWeight={'bold'}
						fontSize={'sm'}
						whiteSpace={'pre-wrap'}>
						{}
					</Text>
				</Stack>

                <Stack
                    align={'center'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    shadow={'md'}
                    justify={'center'}
                >
                    <Text fontWeight="bold">Sender</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                        {item?.shipment_detail?.shipment?.ship_from?.address?.city_locality},{item?.shipment_detail?.shipment?.ship_from?.address?.country_code}
                    </Text>
                </Stack>

                <Stack
                    padding={'10px'}
                    borderRadius={'10px'}
                    shadow={'md'}
                    align={'center'}
                    justify={'center'}
                >
                    <Text fontWeight="bold">Receiver</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                         {item?.shipment_detail?.shipment?.ship_to?.address?.city_locality},{item?.shipment_detail?.shipment?.ship_to?.address?.country_code}
                    </Text>
                </Stack>

                <Stack
                    align={'center'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    shadow={'md'}
                    justify={'center'}>
                
                    <Text fontWeight="bold">Payment</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                        {Number(item?.payment_detail?.net_payable).toFixed(2)}$
                    </Text>
                </Stack>
                <Stack
                    align={'center'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    shadow={'md'}
                >
                    <Text fontWeight="bold">Blockchain Hash</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                        {item?.blockChainHash?.length > 20 ? item?.blockChainHash?.slice(0, 20) + '...' : item?.blockChainHash}
                    </Text>
                    <Button
                        onClick={redirectToEtherScan}
                    >View
                    </Button>
                </Stack>

                <Stack
                    align={'center'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    backgroundColor={'#273746'}
                    color={'white'}
                    shadow={'md'}>
                    <Text fontWeight="bold">Data Access Hash</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                        {item?.dataAccessHash?.length > 20 ? item?.dataAccessHash?.slice(0, 20) + '...' : item?.dataAccessHash}
                    </Text>
                    <Button
                        onClick={() => { clickedCard(item?.dataAccessHash); onOpen() }}
                        backgroundColor={isActive ? '#566573' : 'white'}
                        color={isActive ? 'white' : 'black'}
                    >View</Button>
                </Stack>

                <Stack
                    align={'center'}
                    padding={'10px'}
                    borderRadius={'10px'}
                    shadow={'md'}
                    justify={'center'}
                >
                    <Text fontWeight="bold">Label Purchase Date</Text>
                    <Text
                        fontSize="sm"
                        fontWeight={'bold'}>
                        { moment(item?.createdAt).format('YYYY-MM-DD')}
                    </Text>
                </Stack>
            </Flex>


        </Box>
    );
};

export default LtlCard;