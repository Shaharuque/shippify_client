import { useState } from 'react';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';
import RateCard from './rateCard';
import { Box, Flex } from '@chakra-ui/react';
import BackButton from '../../Buttons/backButton';
import RegularButton from '../../Buttons/regularButton';

type RateCardListProps = {
	rates: IRateDetail[];
	prevStep: () => void;
	nextStep: () => void;
};
const RateCardList = ({ rates, prevStep, nextStep }: RateCardListProps) => {
	const [selectedRateId, setSelectedRateId] = useState('');

	const handleSelectCard = (rateId: string) => {
		if (selectedRateId === rateId) {
			setSelectedRateId('');
		} else {
			setSelectedRateId(rateId);
		}
	};
	return (
		<Box
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
					onClick={() => nextStep()}
					text="Continue"
					width="12rem"
				/>
			</Flex>
		</Box>
	);
};

export default RateCardList;
