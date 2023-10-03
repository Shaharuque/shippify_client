import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Box, Flex, Image, StackDivider, Badge } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import checked from '../../assets/checked.png';
import moment from 'moment';
import { useAppDispatch } from '../../redux/hooks';
import { updatePayment } from '../../redux/features/paymentSlice';

type PaymentModalProps = {
	onClose: () => void;
	isOpen: boolean;
	total: number;
	insured_amount: number;
};

type InstallmentOption = {
	numberOfInstallments: string;
	interest_rate: number;
};

const PaymentModal = ({ onClose, isOpen, total, insured_amount }: PaymentModalProps) => {
	const dispatch = useAppDispatch();

	const [installmentOptions, setInstallmentOptions] = useState<InstallmentOption[]>([]);
	const [selectedOption, setSelectedOption] = useState<InstallmentOption | null>(null);
	const [payable, setPayable] = useState(0);

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

	useEffect(() => {
		if (selectedOption) {
			const result = ((total + (total * selectedOption?.interest_rate) / 100) / Number(selectedOption?.numberOfInstallments)).toFixed(2);
			setPayable(Number(result));
		}
	}, [selectedOption]);

	const handleSelectInstallmentRate = (option: any) => {
		if (selectedOption === option) {
			setSelectedOption(null);
		} else {
			setSelectedOption(option);
			console.log(option);
		}
	};

	const handleCheckout = () => {
		localStorage.setItem(
			'paymentDetails',
			JSON.stringify({
				insurance_amount: insured_amount.toString(),
				bnpl: {
					net_payable: total.toString(),
					numberOfInstallments: Number(selectedOption?.numberOfInstallments),
					first_payable: payable.toString(),
					currentDate: moment(new Date()).format('YYYY-MM-DD'),
				},
			})
		);

		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/payment/create-checkout-session`, {
				payment: { currency: 'USD', rate: payable, insurance: 0, other_amount: 0, date: new Date().toISOString },
			})
			.then((response) => {
				if (response.data.url) {
					window.location.href = response.data.url;
				}
			})
			.catch((err) => console.log(err.message));

		dispatch(
			updatePayment({
				insurance_amount: insured_amount,
				bnpl: {
					net_payable: total,
					numberOfInstallments: selectedOption?.numberOfInstallments,
					first_payable: payable,
					currentDate: moment(new Date()).format('YYYY-MM-DD'),
				},
			})
		);
	};

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
							<Text fontWeight={'600'}>Installments:</Text>
							{installmentOptions?.map((option, index) => (
								<Box
									pos={'relative'}
									mb={'1.5rem'}
									key={index}
									onClick={() => handleSelectInstallmentRate(option)}>
									{option?.interest_rate === selectedOption?.interest_rate && (
										<Image
											src={checked}
											color="green.500"
											position="absolute"
											top={2}
											left={12}
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
						{selectedOption !== null && (
							<Box
								overflowY={'scroll'}
								h={'300px'}
								css={{
									'&::-webkit-scrollbar': {
										width: '0',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: 'rgba(0, 0, 0, 0.5)',
										borderRadius: '0.25em',
									},
								}}>
								{[...Array(parseInt(selectedOption?.numberOfInstallments))].map((_, index) => {
									const installmentDate = new Date();
									installmentDate.setMonth(installmentDate.getMonth() + index);

									return (
										<Box
											key={index}
											borderWidth="1px"
											borderColor="e8edeb"
											p="1rem"
											mb="1rem"
											bg={index >= 1 ? '#f0f0f1' : 'inherit'}
											borderRadius={'1rem'}
											boxShadow="lg">
											<Badge
												mb={'1rem'}
												fontFamily={'Roboto'}
												fontWeight={'500'}
												fontSize={'1rem'}
												colorScheme="green"
												p={'.25rem .5rem'}
												borderRadius={'.5rem'}>
												{index + 1}
												{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Installment
											</Badge>
											<StackDivider borderColor="grey.800" />
											<Text>Payable: {payable} (usd)</Text>

											<Text>Date: {moment(installmentDate).format('ddd, MMM Do YYYY')}</Text>

											{index === 0 && (
												<Flex
													justify={'flex-end'}
													mt={'.5rem'}>
													<Button
														bg={'cta'}
														color={'primary'}
														borderRadius={'1rem'}
														p={'.25rem'}
														w={'7rem'}
														_hover={{ bg: '#2A9D8F' }}
														onClick={handleCheckout}>
														Pay Now
													</Button>
												</Flex>
											)}
										</Box>
									);
								})}
							</Box>
						)}
					</ModalBody>
					<ModalFooter gap={'1rem'}>
						<Button
							onClick={onClose}
							// bg={'#fe3c39'}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaymentModal;
