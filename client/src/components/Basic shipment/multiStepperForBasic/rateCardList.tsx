import { useState } from 'react';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';
import RateCard from './rateCard';
import { Box, Flex } from '@chakra-ui/react';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';
import { useAppDispatch } from '../../../redux/hooks';
import { updateSelectedRate } from '../../../redux/features/selectedRateSlice';

type RateCardListProps = {
	rates: IRateDetail[];
	prevStep: () => void;
	nextStep: () => void;
};
const RateCardList = ({ rates, prevStep, nextStep }: RateCardListProps) => {
	const dispatch = useAppDispatch();
	const [selectedRateId, setSelectedRateId] = useState('');

	const handleSelectCard = (rateId: string) => {
		if (selectedRateId === rateId) {
			setSelectedRateId('');
		} else {
			setSelectedRateId(rateId);
		}
	};
	const handleContinue = () => {
		const selectedRate = rates?.find((rate) => rate?.rate_id === selectedRateId);
		dispatch(updateSelectedRate({ selectedRate }));
		nextStep();
	};

	return (
		<Box
			w={'30rem'}
			h={'800px'}
			overflowY="scroll"
			css={{
				'&::-webkit-scrollbar': {
					width: '0',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderRadius: '0.25em',
				},
			}}>
			{rates.map((rate: IRateDetail, index: number) => (
				<RateCard
					key={index}
					props={rate}
					isSelected={selectedRateId === rate.rate_id}
					onSelect={handleSelectCard}
				/>
			))}

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
					isDisabled={!selectedRateId || selectedRateId.length === 0}
					error_message="You haven't selected any rate"
				/>
			</Flex>
		</Box>
	);
};

export default RateCardList;
