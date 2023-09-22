import { useState } from 'react';
import { IRateDetail } from '../../../redux/features/rateDetailsSlice';
import RateCard from './rateCard';

type RateCardListProps = {
	rates: IRateDetail[];
};
const RateCardList = ({ rates }: RateCardListProps) => {
	const [selectedRateId, setSelectedRateId] = useState('');

	const handleSelectCard = (rateId: string) => {
		setSelectedRateId(rateId);
	};
	return (
		<div>
			{rates.map((rate: IRateDetail, index: number) => (
				<RateCard
					key={index}
					props={rate}
					isSelected={selectedRateId === rate.rate_id}
					onSelect={handleSelectCard}
				/>
			))}
		</div>
	);
};

export default RateCardList;
