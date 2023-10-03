import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react';
import successTickLottie from '../../assets/Success_tick.json';
import { useLottie } from 'lottie-react';
import RegularButton from '../Buttons/regularButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPaymentData } from '../../redux/features/paymentSlice';
import { generateTransactionID } from '../../utils/randomTransactionIdGenerator';

const SuccessFulPayment = () => {
	const navigate = useNavigate();
	const [payment, setPayment] = useState<IPaymentData>();

	const successTickLottieOptions = {
		animationData: successTickLottie,
		loop: false,
	};

	const { View: successTickLottieView } = useLottie(successTickLottieOptions);

	useEffect(() => {
		const fetchPaymentDetails = async () => {
			const paymentDetails = localStorage.getItem('paymentDetails');
			if (paymentDetails) {
				const parsedPayment = JSON.parse(paymentDetails);
				setPayment(parsedPayment);
			}
		};

		fetchPaymentDetails();
	}, []);

	useEffect(() => {
		if (payment) {
			const shipmentId = localStorage.getItem('shipmentId');
			const shipment = localStorage.getItem('shipmentType');
			const token = localStorage.getItem('token');
			const quoteId = localStorage.getItem('quoteId');
			const pickupDate = localStorage.getItem('pickup_date');

			const purchaseBasicShipment = async (payload: any) => {
				try {
					const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/shipment/parched-shipment/${shipmentId}`, payload, {
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					});
					console.log('response from basic', response?.data);
				} catch (error) {
					console.error('Error', error);
				}
			};

			const purchaseLTLShipment = async (payload: any) => {
				try {
					const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/ltlShipment/parched-shipment/${shipmentId}`, payload, {
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': token,
						},
					});
					console.log('response from basic', response?.data);
				} catch (error) {
					console.error('Error', error);
				}
			};
			if (shipment === 'ltl') {
				const payload = {
					insurance_amount: payment?.insurance_amount,
					bnpl: payment?.bnpl,
					normal_payment: payment?.normal_payment,
					quote_id: quoteId,
					pickup_date: pickupDate,
					carrier: {
						test: true,
						instructions: 'pickup at back gate',
					},
					estimated_delivery_days: 1,
				};
				purchaseLTLShipment(payload);
			} else {
				const payload = {
					insurance_amount: payment?.insurance_amount,
					bnpl: payment?.bnpl,
					normal_payment: payment?.normal_payment,
				};
				purchaseBasicShipment(payload);
			}
		}
	}, [payment]);

	return (
		<Flex
			h={'100vh'}
			justifyContent="center"
			alignItems="center"
			bg={'linear-gradient(135deg, hsla(155, 44%, 92%, 1) 0%, hsla(191, 24%, 62%, 1) 100%)'}>
			<Box
				p="4"
				maxW="md"
				w="full"
				borderWidth="1px"
				borderRadius="lg"
				boxShadow="lg"
				bg="white"
				textAlign="center">
				<Center>
					<Box
						mb="4"
						boxSize={'8rem'}>
						{successTickLottieView}
					</Box>
				</Center>
				<Text
					fontWeight={'600'}
					fontSize={'1.25rem'}
					fontFamily={'Roboto'}
					mb="4">
					Your payment is done successfully!
				</Text>
				<Flex
					justify={'space-between'}
					my={'4rem'}>
					<VStack
						fontWeight={'500'}
						align="flex-start">
						<Text>Paid amount</Text>
						<Text>Transaction ID</Text>
					</VStack>

					<VStack
						fontWeight={'500'}
						align="flex-end">
						<Text>{payment?.bnpl?.first_payable || payment?.normal_payment?.net_payable} (USD)</Text>
						<Text letterSpacing={0.8}>{generateTransactionID()}</Text>
					</VStack>
				</Flex>
				<Flex gap={'1rem'}>
					<RegularButton
						onClick={() => console.log('Go to label creation!')}
						text="Create label"
						width="12rem"
					/>
					<RegularButton
						onClick={() => navigate('/home')}
						text="Go Home"
						width="12rem"
					/>
				</Flex>
			</Box>
		</Flex>
	);
};

export default SuccessFulPayment;
