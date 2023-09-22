import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useFetchRatesMutation } from '../../../redux/api/shipmentsApi';
import { Box, Flex } from '@chakra-ui/react';
import BackButton from '../../Buttons/backButton';
import { IRateDetail, updateRates } from '../../../redux/features/rateDetailsSlice';
import RateCard from './rateCard';
import { dummyRateCardData } from '../../../data/dummyRateCardData';

const RateSelectionForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const shipmentInfo = useAppSelector((state: RootState) => state.shipments);
	const [fetchRates] = useFetchRatesMutation({});
	const [rates, setRates] = useState<IRateDetail[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const result = await fetchRates({ shipments: [shipmentInfo] });
				// console.log('Response:', result.data);
				// setRates(result.data?.rateDetail?.rates);
				// dispatch(updateRates(result.data?.rateDetail?.rates));
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [shipmentInfo, fetchRates]);

	useEffect(() => {
		console.log('rates:', rates);
	}, [rates]);

	return (
		<Box>
			<>
				<RateCard {...dummyRateCardData} />
			</>
			<Flex
				justify={'flex-end'}
				m={'1rem 0'}>
				<BackButton
					onClick={() => prevStep()}
					width="6rem"
				/>
			</Flex>
		</Box>
	);
};

export default RateSelectionForm;
