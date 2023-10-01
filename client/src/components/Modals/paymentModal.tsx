import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Box, Flex, Image } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import checked from '../../assets/checked.png';

type PaymentModalProps = {
	onClose: () => void;
	isOpen: boolean;
};

const PaymentModal = ({ onClose, isOpen }: PaymentModalProps) => {
	const [installments, setInstallments] = useState(2);
	const [totalShippingCost, setTotalShippingCost] = useState(1000);
	const [installmentOptions, setInstallmentOptions] = useState<any[]>([]);
	const [selectedInstallmentRate, setSelectedInstallmentRate] = useState(-1);

	const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();

		const value = Number(event.target.value);
		setInstallments(value);
	};

	useEffect(() => {
		setTotalShippingCost(1000);
	}, []);

	const handleSelectInstallmentRate = (option: any) => {
		if (selectedInstallmentRate === option?.interest_rate) setSelectedInstallmentRate(-1);
		else setSelectedInstallmentRate(option?.interest_rate);
	};

	useEffect(() => console.log('selected rate', selectedInstallmentRate), []);

	useEffect(() => {
		const fetchCreditOptions = async () => {
			const userData = localStorage.getItem('userData');

			try {
				if (userData) {
					const user = JSON.parse(userData);
					const response = await axios.post('http://192.168.68.76:4000/credit-score/credit-options', {
						user_id: user?._id,
					});
					console.log('response', response?.data);
					setInstallmentOptions(response?.data);
				}
			} catch (error) {
				console.error('Error while fetching data:', error);
			}
		};
		fetchCreditOptions();
	}, []);

	return (
		<>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Buy Now Pay Later</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex
							gap={'1rem'}
							align={'center'}>
							<Text>Installments:</Text>
							{installmentOptions?.map((option, index) => (
								<Box
									pos={'relative'}
									mb={'1.5rem'}
									key={index}
									onClick={() => handleSelectInstallmentRate(option)}>
									{option?.installment_rate === selectedInstallmentRate && (
										<Image
											src={checked}
											color="green.500"
											position="absolute"
											top={2}
											left={2}
											boxSize={6}
										/>
									)}
									<Box
										textAlign={'center'}
										fontWeight={'600'}>
										{option?.numberOfInstallments}
									</Box>
									<Box
										bg={'primary'}
										borderRadius={'.5rem'}
										p={'1rem'}
										w={'4rem'}
										color={'black'}
										textAlign={'center'}
										border={'1px solid black'}
										fontWeight={'600'}>
										{option?.interest_rate}%
									</Box>
								</Box>
							))}
						</Flex>

						<Box mt={'.5vw'}>
							Payable (per month): <Text as="span">{Math.ceil(totalShippingCost / installments)} USD</Text>
						</Box>
					</ModalBody>
					<ModalFooter gap={'1rem'}>
						<Button> Pay {Math.ceil(totalShippingCost / installments)} USD</Button>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaymentModal;
