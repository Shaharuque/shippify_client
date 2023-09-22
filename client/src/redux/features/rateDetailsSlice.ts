import { createSlice } from '@reduxjs/toolkit';

export interface IRateDetail {
	rate_id: string;
	rate_type: string;
	carrier_id: string;
	shipping_amount: {
		currency: string;
		amount: number;
	};
	insurance_amount: {
		currency: string;
		amount: number;
	};
	confirmation_amount: {
		currency: string;
		amount: number;
	};
	other_amount: {
		currency: string;
		amount: number;
	};
	delivery_days: number;

	estimated_delivery_date: string;
	carrier_delivery_days: string;
	ship_date: string;
	service_type: string;
	service_code: string;
	trackable: boolean;
	carrier_code: string;
	carrier_friendly_name: string;

	rate_details: any[];
	zone: any;
	package_type: any;
	guaranteed_service: boolean;
	negotiated_rate: boolean;
	carrier_nickname: string;
	validation_status: string;
	warning_messages: string[];
	error_messages: string[];
}

const initialRateDetailState: IRateDetail[] = [
	{
		rate_id: '',
		rate_type: '',
		carrier_id: '',
		shipping_amount: {
			currency: '',
			amount: 0,
		},
		insurance_amount: {
			currency: '',
			amount: 0,
		},
		confirmation_amount: {
			currency: '',
			amount: 0,
		},
		other_amount: {
			currency: '',
			amount: 0,
		},
		delivery_days: 0,
		guaranteed_service: false,
		estimated_delivery_date: '',
		carrier_delivery_days: '',
		ship_date: '',
		service_type: '',
		service_code: '',
		trackable: false,
		carrier_code: '',
		carrier_friendly_name: '',
		rate_details: [],
		zone: null,
		package_type: null,
		negotiated_rate: false,
		carrier_nickname: '',
		validation_status: '',
		warning_messages: [],
		error_messages: [],
	},
];

const rateDetailsSlice = createSlice({
	name: 'rateDetails',
	initialState: initialRateDetailState,
	reducers: {
		updateRates: (state, action) => {
			return action.payload;
		},
	},
});

export const { updateRates } = rateDetailsSlice.actions;
export default rateDetailsSlice.reducer;
