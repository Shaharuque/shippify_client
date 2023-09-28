import { createSlice } from '@reduxjs/toolkit';
import { IRateDetail } from './rateDetailsSlice';

export interface ISelectedRate {
	shipmentId: string;
	selectedRate: IRateDetail;
}

const initialRateValue: ISelectedRate = {
	shipmentId: '',
	selectedRate: {
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
		estimated_delivery_date: '',
		carrier_delivery_days: '',
		ship_date: '',
		service_type: '',
		service_code: '',
		trackable: false,
		carrier_code: '',
		carrier_friendly_name: '',
		rate_details: [],
		zone: undefined,
		package_type: undefined,
		guaranteed_service: false,
		negotiated_rate: false,
		carrier_nickname: '',
		validation_status: '',
		warning_messages: [],
		error_messages: [],
	},
};

const selectedRateSlice = createSlice({
	name: 'selectedRate',
	initialState: initialRateValue,
	reducers: {
		updateSelectedRate: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateSelectedRate } = selectedRateSlice.actions;
export default selectedRateSlice.reducer;
