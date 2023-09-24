import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useFetchRatesMutation } from '../../../redux/api/shipmentsApi';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import BackButton from '../../Buttons/backButton';
import { IRateDetail, updateRates } from '../../../redux/features/rateDetailsSlice';
import RateCardList from './rateCardList';
import RegularButton from '../../Buttons/regularButton';
import SpinningLoader from '../../Loader/spinningLoader';
import Error from '../../Error bad request/error';
import { dummyRateCardData } from '../../../data/dummyRateCardsData';
import PriceAscendingDescendingFilter from '../../Filters/priceAscendingDescending';
import DeliveryDateFilter from '../../Filters/deliveryDate';
import PriceRangeFilter from '../../Filters/priceRange';

const RateSelectionForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const shipmentInfo = useAppSelector((state: RootState) => state.shipments);
	const [fetchRates, { isLoading, isError }] = useFetchRatesMutation();
	const [rates, setRates] = useState<IRateDetail[]>([]);
	const [minRate, setMinRate] = useState(0);
	const [maxRate, setMaxRate] = useState(0);
	const [selectedRange, setSelectedRange] = useState([minRate, maxRate]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const result = await fetchRates({ shipments: [shipmentInfo] });
				// console.log('Response:', result.data);
				// setRates(result.data?.rateDetail?.rates);
				// dispatch(updateRates(result.data?.rateDetail?.rates));

				setRates([...dummyRateCardData.sort((a: IRateDetail, b: IRateDetail) => a.shipping_amount?.amount - b.shipping_amount?.amount)]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [shipmentInfo, fetchRates]);

	useMemo(() => {
		const amounts = rates.map((rate) => rate.shipping_amount?.amount);
		const min = Math.floor(Math.min(...amounts));
		const max = Math.ceil(Math.max(...amounts));
		setMinRate(min);
		setMaxRate(max);
		setSelectedRange([min, max]);
	}, []);

	const handleContinue = () => {
		nextStep();
	};

	const handlePriceFilterChange = (value: string) => {
		console.log('value:', value);
		if (value === 'asc') {
			setRates([...rates.sort((a: IRateDetail, b: IRateDetail) => a.shipping_amount?.amount - b.shipping_amount?.amount)]);
		} else if (value === 'desc') {
			setRates([...rates.sort((a: IRateDetail, b: IRateDetail) => b.shipping_amount?.amount - a.shipping_amount?.amount)]);
		}
	};

	const handleDeliveryDateFilterChange = (value: string) => {
		console.log('value:', value);

		if (value === 'asc') {
			setRates([...rates.sort((a: IRateDetail, b: IRateDetail) => a.delivery_days - b.delivery_days)]);
		} else if (value === 'desc') {
			setRates([...rates.sort((a: IRateDetail, b: IRateDetail) => b.delivery_days - a.delivery_days)]);
		}
	};

	const handlePriceRangeFilterChange = (value: number[]) => {
		console.log('value:', value);

		setSelectedRange(value);
		const filteredRates = dummyRateCardData.filter((rate) => {
			const amount = rate.shipping_amount?.amount || 0;
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
				<Box h={'80vh'}>
					<Center>
						<SpinningLoader />
					</Center>
				</Box>
			) : (
				<Box>
					<Flex
						alignItems="flex-start"
						gap={'5rem'}>
						<Box w={'12rem'}>
							<PriceRangeFilter
								minValue={minRate}
								maxValue={maxRate}
								onRangeChange={handlePriceRangeFilterChange}
							/>
							<PriceAscendingDescendingFilter onChange={handlePriceFilterChange} />
							<DeliveryDateFilter onChange={handleDeliveryDateFilterChange} />
						</Box>

						<Box w={'30rem'}>
							<Box
								height="fit-content"
								overflowY="auto"
								css={{
									'&::-webkit-scrollbar': {
										width: '0',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: 'rgba(0, 0, 0, 0.5)',
										borderRadius: '0.25em',
									},
								}}>
								<RateCardList rates={rates} />
							</Box>
							<Flex
								justify="flex-end"
								m="2rem 0"
								gap="1rem">
								<BackButton
									onClick={() => prevStep()}
									width="8rem"
								/>
								<RegularButton
									onClick={handleContinue}
									text="Continue"
									width="12rem"
								/>
							</Flex>
						</Box>
					</Flex>
				</Box>
			)}
		</>
	);
};

export default RateSelectionForm;
