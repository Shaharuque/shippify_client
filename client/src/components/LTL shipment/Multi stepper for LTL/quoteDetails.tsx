import { useEffect } from 'react';
import { useFetchQuoteMutation } from '../../../redux/api/ltlShipmentApi';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import BackButton from '../../Buttons/backButton';
import { Box, Flex } from '@chakra-ui/react';
import QuoteSummary from '../../Cards/quoteSummary';
import RegularButton from '../../Buttons/regularButton';

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
		<Box>
			<QuoteSummary />

			<Flex
				mt={'4rem'}
				gap={'1rem'}
				justify={'flex-end'}
				align={'center'}>
				<BackButton
					onClick={() => prevStep()}
					width="8rem"
				/>
				<RegularButton
					onClick={() => nextStep()}
					width="12rem"
					text={'Continue'}
				/>
			</Flex>
		</Box>
	);
};

export default QuoteDetails;
