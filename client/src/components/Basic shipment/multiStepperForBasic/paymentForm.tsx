import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import ShippingSummary from '../../Cards/shippingSummary';
import BackButton from '../../Buttons/backButton';
import PaymentModal from '../../Modals/paymentModal';
import axios from 'axios';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

const PaymentForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const selectedRate = useAppSelector((state: RootState) => state?.selectedRate);
	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);
	const total = selectedRate?.shipping_amount?.amount + selectedRate?.other_amount?.amount + insuranceDetails?.insurance_amount;

	const handleCheckout = () => {
		localStorage.setItem('total_payment', total);

		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/payment/create-checkout-session`, {
				payment: { currency: selectedRate?.selectedRate?.shipping_amount?.currency, rate: selectedRate?.selectedRate?.shipping_amount?.amount, insurance: insuranceDetails?.insurance_amount, other_amount: selectedRate?.selectedRate?.other_amount?.amount, data: selectedRate?.selectedRate?.estimated_delivery_date },
			})
			.then((response) => {
				if (response.data.url) {
					window.location.href = response.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<Box
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
			<ShippingSummary />
			<PaymentModal
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Flex
				mt={'4rem'}
				gap={'1rem'}
				justify={'flex-end'}
				align={'center'}>
				<BackButton
					onClick={() => prevStep()}
					width="8rem"
				/>
				<Button onClick={onOpen}>Buy now pay later</Button>
				<Button onClick={handleCheckout}>Pay now</Button>
			</Flex>
		</Box>
	);
};

export default PaymentForm;
