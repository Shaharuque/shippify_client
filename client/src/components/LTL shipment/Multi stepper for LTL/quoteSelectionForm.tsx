import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import axios from 'axios';
import BackButton from '../../Buttons/backButton';

const QuoteSelectionForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const ltlShipmentInfo = useAppSelector((state: RootState) => state.ltlShipments);

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('shipment', ltlShipmentInfo);

		const fetchData = async () => {
			try {
				const result = await axios.post('http://192.168.68.89:5000/ltlShipment/request-for-quote', ltlShipmentInfo, {
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token,
					},
				});
				console.log('result:', result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [ltlShipmentInfo]);

	return (
		<div>
			<BackButton onClick={() => prevStep()}></BackButton>
		</div>
	);
};

export default QuoteSelectionForm;
