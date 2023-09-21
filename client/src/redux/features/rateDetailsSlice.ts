import { createSlice } from '@reduxjs/toolkit';

export interface IRateDetail {
	rate_id: string;
	rate_type: string;
	image: string;
	carrier_id: string;
	carrier_name: string;
	carrier_friendly_name: string;
	carrier_code: string;
	service: string;
	service_type: string;
	service_code: string;
	shipping_amount: {
		currency: string;
		amount: number;
	};
	insurance_amount: {
		currency: string;
		amount: number;
	};
	other_amount: {
		currency: string;
		amount: number;
	};
	confirmation_amount: {
		currency: string;
		amount: number;
	};
	tax_amount: string;
	delivery_days: number;
	carrier_delivery_days: string;
	estimated_delivery_date: string;
	trackable: boolean;
}
const initialState: IRateDetail[] = [
	{
		rate_id: '',
		rate_type: '',
		image: '',
		carrier_id: '',
		carrier_name: '',
		carrier_friendly_name: '',
		carrier_code: '',
		service: '',
		service_type: '',
		service_code: '',
		shipping_amount: {
			currency: '',
			amount: 0,
		},
		insurance_amount: {
			currency: '',
			amount: 0,
		},
		other_amount: {
			currency: '',
			amount: 0,
		},
		confirmation_amount: {
			currency: '',
			amount: 0,
		},
		tax_amount: '',
		delivery_days: 0,
		carrier_delivery_days: '',
		estimated_delivery_date: '',
		trackable: false,
	},
];

const rateDetailsSlice = createSlice({
	name: 'rateDetails',
	initialState,
	reducers: {
		updateRates: (state, action) => {
			return action.payload;
		},
	},
});

export const { updateRates } = rateDetailsSlice.actions;
export default rateDetailsSlice.reducer;
