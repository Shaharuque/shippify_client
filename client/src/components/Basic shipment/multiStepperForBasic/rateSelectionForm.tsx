import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useFetchRatesMutation } from '../../../redux/api/basicShipmentsApi';
import { Box, Flex } from '@chakra-ui/react';
import { IRateDetail, updateRates } from '../../../redux/features/rateDetailsSlice';
import RateCardList from './rateCardList';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import PriceAscendingDescendingFilter from '../../Filters/priceAscendingDescending';
import DeliveryDateFilter from '../../Filters/deliveryDate';
import PriceRangeFilter from '../../Filters/priceRange';

const RateSelectionForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const shipmentInfo = useAppSelector((state: RootState) => state.basicShipments);
	const [fetchRates, { isLoading, isError }] = useFetchRatesMutation();
	const [rates, setRates] = useState<IRateDetail[]>([]);
	const [filterableRates, setFilterableRates] = useState<IRateDetail[]>([]);
	const [minRate, setMinRate] = useState(0);
	const [maxRate, setMaxRate] = useState(100);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchRates({ shipments: [shipmentInfo] });
				console.log('Response:', result?.data);
				setRates(result?.data?.rateDetail?.rates);
				setFilterableRates(result?.data?.rateDetail?.rates);
				dispatch(updateRates(result?.data?.rateDetail?.rates));
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [shipmentInfo, fetchRates]);

	useEffect(() => {
		const minShippingAmount = rates.reduce((min, rate) => {
			const amount = rate.shipping_amount?.amount || 0;
			return amount < min ? amount : min;
		}, Number.MAX_SAFE_INTEGER);
		setMinRate(Math.floor(minShippingAmount));

		const maxShippingAmount = rates.reduce((max, rate) => {
			const amount = rate.shipping_amount?.amount || 0;
			return amount > max ? amount : max;
		}, 0);
		setMaxRate(Math.ceil(maxShippingAmount));
	}, [rates]);

	const handlePriceFilterChange = (value: string) => {
		if (value === 'asc') {
			setRates((prev) => Array.from(prev).sort((a: IRateDetail, b: IRateDetail) => a?.shipping_amount?.amount - b?.shipping_amount?.amount));
		} else if (value === 'desc') {
			setRates((prev) => Array.from(prev).sort((a: IRateDetail, b: IRateDetail) => b?.shipping_amount?.amount - a?.shipping_amount?.amount));
		}
	};

	const handleDeliveryDateFilterChange = (value: string) => {
		if (value === 'asc') {
			setRates((prev) => Array.from(prev).sort((a: IRateDetail, b: IRateDetail) => a?.delivery_days - b?.delivery_days));
		} else if (value === 'desc') {
			setRates((prev) => Array.from(prev).sort((a: IRateDetail, b: IRateDetail) => b?.delivery_days - a?.delivery_days));
		}
	};

	const handlePriceRangeFilterChange = (value: number[]) => {
		const filteredRates = [...filterableRates].filter((rate) => {
			const amount = rate.shipping_amount?.amount;
			return amount >= value[0] && amount <= value[1];
		});

		setRates(filteredRates);
	};

	if (isError) {
		return (
			<>
				<Error />
			</>
		);
	}

	return (
		<>
			{isLoading ? (
				<Box>
					<SpinningLoader />
				</Box>
			) : (
				<Box>
					<Flex
						alignItems="flex-start"
						gap={'5rem'}>
						<Box w={'12rem'}>
							<PriceRangeFilter
								minRate={minRate}
								maxRate={maxRate}
								onRangeChange={handlePriceRangeFilterChange}
							/>
							<PriceAscendingDescendingFilter onChange={handlePriceFilterChange} />
							<DeliveryDateFilter onChange={handleDeliveryDateFilterChange} />
						</Box>

						<Box>
							<RateCardList
								rates={rates}
								prevStep={prevStep}
								nextStep={nextStep}
							/>
						</Box>
					</Flex>
				</Box>
			)}
		</>
	);
};

export default RateSelectionForm;
