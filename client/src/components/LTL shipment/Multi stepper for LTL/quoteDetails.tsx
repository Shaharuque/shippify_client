import { useEffect } from 'react';
import { useFetchQuoteMutation } from '../../../redux/api/ltlShipmentApi';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import BackButton from '../../Buttons/backButton';

const QuoteDetails = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const ltlShipmentInfo = useAppSelector((state: RootState) => state.ltlShipments);

	const [fetchQuote] = useFetchQuoteMutation();

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('shipment', ltlShipmentInfo);

		const fetchData = async () => {
			try {
				const result = await fetchQuote({ data: ltlShipmentInfo, token });
				console.log('result:', result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [ltlShipmentInfo, fetchQuote]);

	return (
		<div>
			<BackButton onClick={() => prevStep()}></BackButton>
		</div>
	);
};

export default QuoteDetails;
