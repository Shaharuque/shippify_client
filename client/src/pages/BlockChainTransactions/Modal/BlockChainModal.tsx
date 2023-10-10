import React, { useState } from 'react';
import { Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Icon, Box, Badge } from '@chakra-ui/react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import SpinningLoader from '../../../components/Loader/spinningLoader';
import { labelColorDictionary, labelDictionary } from '../../../data/labelDictionary';


type BlockChainModalProps = {
    isOpen: boolean;
    onClose: () => void;
    blockData: any;
    activeCard: string;
    hashLoading: boolean;
}

const BlockChainModal = ({ isOpen, onClose, blockData, activeCard, hashLoading }: BlockChainModalProps) => {
    const [more, setMore] = useState(false)
    return (
        <div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >
                        <Flex align="center" justify="center" gap={'.5rem'}>
                            <Text color={'teal'}>Transaction Details</Text>
                            <Icon color={'teal'} as={AiOutlineFileSearch} boxSize={'1.5rem'} />
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    {
                        hashLoading ? <SpinningLoader></SpinningLoader>
                            :
                            <ModalBody>

                                <h1 className='text-[12px] font-bold'>Hash ID: {!more ? `${activeCard?.slice(0, 20)}...` : activeCard}<button className='bg-black p-[2px] text-white rounded ml-2' onClick={() => { setMore(!more) }}>{more ? 'Hide' : 'Show'}</button></h1>
                                <Box marginTop={"10px"} marginBottom={"10px"} boxShadow={'lg'} padding={'20px'} borderRadius={"5px"}>
                                    <Flex marginBottom={"10px"}>
                                        <Text fontWeight={"bold"}>Email:</Text>
                                        <Text fontWeight={"bold"} marginLeft={'5px'}> {blockData?.data?.email}</Text>
                                    </Flex>
                                    <Flex marginBottom={"10px"}>
                                        <Text fontWeight={"bold"}>Carrier:</Text>
                                        <Text fontWeight={"bold"} marginLeft={'5px'}> {blockData?.data?.carrierName}</Text>
                                    </Flex>
                                    <Flex marginBottom={"10px"}>
                                        <Text fontWeight={"bold"}>Service:</Text>
                                        <Text fontWeight={"bold"} marginLeft={'5px'}> {blockData?.data?.shipmentServiceCode}</Text>
                                    </Flex>

                                    {
                                        blockData?.data?.paymentMethod === 'BNPL' &&
                                        <>
                                            <Flex marginBottom={"10px"}>
                                                <Text fontWeight={"bold"}>Payment Method:</Text>
                                                <Text fontWeight={"bold"} marginLeft={'5px'}> {blockData?.data?.paymentMethod}</Text>
                                            </Flex>

                                            <Flex marginBottom={"10px"}>
                                                <Text fontWeight={"bold"}>Number of Installments:</Text>
                                                <Text fontWeight={"bold"} marginLeft={'5px'}> {blockData?.data?.payableAmount?.length}</Text>
                                            </Flex>
                                        </>
                                    }

                                    <Flex marginBottom={"10px"}>
                                        <Text fontWeight={"bold"}>Paid Amount:</Text>
                                        {
                                            blockData?.data?.paidAmount?.length > 0 ?
                                                blockData?.data?.paidAmount?.map((item: any, index: any) => {
                                                    return (
                                                        <Text fontWeight={"bold"} marginLeft={'5px'} key={index}> {item}$</Text>
                                                    )
                                                })
                                                :
                                                <Text fontWeight={"bold"} marginLeft={'5px'}> {Number(blockData?.data?.netPayable).toFixed(2)}$</Text>
                                        }
                                    </Flex>

                                    <div className='flex items-center gap-2'>
                                        <Text fontWeight={"bold"}>Status:</Text>


                                        <Badge
                                            colorScheme={labelColorDictionary[blockData?.data?.status]}
                                            borderRadius={'md'}
                                            fontSize={'xs'}>
                                            {labelDictionary[blockData?.data?.status]}
                                        </Badge>
                                    </div>

                                </Box>
                            </ModalBody>
                    }
                </ModalContent>
            </Modal>

        </div>

    );
};

export default BlockChainModal;