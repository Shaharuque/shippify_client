import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import ShippingSummary from '../../Cards/shippingSummary';
import BackButton from '../../Buttons/backButton';
import PaymentModal from '../../Modals/paymentModal';
import axios from 'axios';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';

const PaymentForm = ({ prevStep }: { prevStep: () => void }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const selectedRate = useAppSelector((state: any) => state?.selectedRate?.selectedRate);
	const shipmentId = useAppSelector((state: any) => state?.selectedRate?.shipmentId);
	const insuranceDetails = useAppSelector((state: RootState) => state?.insurance);
	const [viewBNPLBtn, setViewBNPLBtn] = useState(false);

	const total_shipping_charge = Number(selectedRate?.shipping_amount?.amount) + Number(selectedRate?.other_amount?.amount) + Number(insuranceDetails?.insurance_amount);
	const platform_fee = total_shipping_charge * 0.1;
	const total = total_shipping_charge + platform_fee;

	const handleNormalCheckout = () => {
		localStorage.setItem(
			'paymentDetails',
			JSON.stringify({
				insurance_amount: insuranceDetails?.product_value?.toString(),
				normal_payment: {
					net_payable: total?.toString(),
				},
			})
		);
		localStorage.setItem('total', JSON.stringify(total));
		localStorage.setItem('shipmentId', shipmentId);
		localStorage.setItem('shipmentType', 'basic');
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/payment/create-checkout-session`, {
				payment: { currency: selectedRate?.shipping_amount?.currency, rate: Number(selectedRate?.shipping_amount?.amount)?.toFixed(2), insurance: Number(insuranceDetails?.insurance_amount)?.toFixed(2), other_amount: Number(selectedRate?.other_amount?.amount)?.toFixed(2), date: selectedRate?.estimated_delivery_date },
			})
			.then((response) => {
				if (response.data.url) {
					window.location.href = response.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};

	useEffect(() => {
		const fetchCreditOptions = async () => {
			const userData = localStorage.getItem('userData');

			try {
				if (userData) {
					const user = JSON.parse(userData);
					const response = await axios.post(`${import.meta.env.VITE_BNPL_URL}/credit-score/eligibility`, {
						user_id: user?._id,
						shipping_fee: total,
					});
					console.log('response', response?.data?.allowed);
					setViewBNPLBtn(response?.data?.allowed);
				}
			} catch (error) {
				console.error('Error while fetching data:', error);
			}
		};
		fetchCreditOptions();
	}, []);

	return (
		<Box overflowY={'scroll'}>
			<ShippingSummary />
			<PaymentModal
				isOpen={isOpen}
				onClose={onClose}
				total={total}
				insured_amount={insuranceDetails?.product_value || 0}
			/>

			<Flex
				mt={'4rem'}
				justify={'space-between'}
				align={'center'}>
				<BackButton
					onClick={() => prevStep()}
					width="8rem"
				/>
				<Flex
					gap={'1rem'}
					justify={'flex-end'}>
					{viewBNPLBtn && <Button onClick={onOpen}>Pay later</Button>}
					<Button onClick={handleNormalCheckout}>Pay now</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default PaymentForm;
