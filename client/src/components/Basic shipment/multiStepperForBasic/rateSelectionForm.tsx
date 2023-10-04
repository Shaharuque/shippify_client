import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useFetchRatesMutation } from '../../../redux/api/basicShipmentsApi';
import { Box, Flex, Text } from '@chakra-ui/react';
import { IRateDetail, updateRates } from '../../../redux/features/rateDetailsSlice';
import RateCardList from './rateCardList';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import PriceAscendingDescendingFilter from '../../Filters/priceAscendingDescending';
import DeliveryDateFilter from '../../Filters/deliveryDate';
import PriceRangeFilter from '../../Filters/priceRange';
import { updateSelectedRate } from '../../../redux/features/selectedRateSlice';
import NoDataFound from '../../No service available/noDataFound';
// import { dummyRateCardData } from '../../../data/dummyRateCardsData';

const RateSelectionForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const shipmentInfo = useAppSelector((state: RootState) => state?.basicShipments);
	const token = localStorage.getItem('token');
	const [fetchRates, { isLoading, isError }] = useFetchRatesMutation({ shipments: [shipmentInfo], token });
	const [rates, setRates] = useState<IRateDetail[]>([]);
	const [filterableRates, setFilterableRates] = useState<IRateDetail[]>([]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchRates({ shipments: [shipmentInfo], token });
				console.log('Response:', result?.data);
				setRates(result?.data?.rateDetail?.rates);
				setFilterableRates(result?.data?.rateDetail?.rates);
				dispatch(updateRates(result?.data?.rateDetail?.rates));
				dispatch(updateSelectedRate({ shipmentId: result?.data?.data?._id }));
				localStorage.setItem('shipmentId', result?.data?.data?._id);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [shipmentInfo, fetchRates]);

	const handlePriceFilterChange = (value: string) => {
		console.log(value);
		if (value === 'asc') {
			setRates((prev) => Array.from(prev)?.sort((a: IRateDetail, b: IRateDetail) => a?.shipping_amount?.amount - b?.shipping_amount?.amount));
		} else if (value === 'desc') {
			setRates((prev) => Array.from(prev)?.sort((a: IRateDetail, b: IRateDetail) => b?.shipping_amount?.amount - a?.shipping_amount?.amount));
		}
	};

	const handleDeliveryDateFilterChange = (value: string) => {
		if (value === 'asc') {
			setRates((prev) => Array.from(prev)?.sort((a: IRateDetail, b: IRateDetail) => a?.delivery_days - b?.delivery_days));
		} else if (value === 'desc') {
			setRates((prev) => Array.from(prev)?.sort((a: IRateDetail, b: IRateDetail) => b?.delivery_days - a?.delivery_days));
		}
	};

	const handlePriceRangeFilterChange = (value: number[]) => {
		const filteredRates = [...filterableRates].filter((rate) => {
			const amount = rate?.shipping_amount?.amount;
			return amount >= value[0] && amount <= value[1];
		});

		setRates(filteredRates);
	};

	return (
		<>
			{isError ? (
				<>
					<Error />
				</>
			) : isLoading ? (
				<>
					<SpinningLoader />
				</>
			) : (
				<Box>
					{!rates || rates.length === 0 ? (
						<Flex
							height="70vh"
							direction={'column'}
							justifyContent="center"
							alignItems="center">
							<NoDataFound
								text="No rates available!"
								backButton={prevStep}
							/>
						</Flex>
					) : (
						<Flex
							alignItems="flex-start"
							gap={'5rem'}>
							<Box w={'12rem'}>
								<PriceRangeFilter onRangeChange={handlePriceRangeFilterChange} />
								<PriceAscendingDescendingFilter onChange={handlePriceFilterChange} />
								<DeliveryDateFilter onChange={handleDeliveryDateFilterChange} />
							</Box>

							<Box>
								<RateCardList
									rates={rates}
									// rates={dummyRateCardData}
									prevStep={prevStep}
									nextStep={nextStep}
								/>
							</Box>
						</Flex>
					)}
				</Box>
			)}
		</>
	);
};

export default RateSelectionForm;
