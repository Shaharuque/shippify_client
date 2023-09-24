import { useState } from 'react';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';
import RateCard from './rateCard';

type RateCardListProps = {
	rates: IRateDetail[];
};
const RateCardList = ({ rates }: RateCardListProps) => {
	const [selectedRateId, setSelectedRateId] = useState('');

	const handleSelectCard = (rateId: string) => {
		if (selectedRateId === rateId) {
			setSelectedRateId('');
		} else {
			setSelectedRateId(rateId);
		}
	};
	return (
		<>
			{rates.map((rate: IRateDetail, index: number) => (
				<RateCard
					key={index}
					props={rate}
					isSelected={selectedRateId === rate.rate_id}
					onSelect={handleSelectCard}
				/>
			))}
		</>
	);
};

export default RateCardList;
