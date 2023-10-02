import { createSlice } from '@reduxjs/toolkit';

export interface ILTLTotalCharge {
	amount: {
		currency: string;
		value: number;
	};
	shipmentId: string;
}

const initialState = {
	amount: {
		currency: '',
		value: 0,
	},
	shipmentId: '',
};

const ltlTotalChargeSlice = createSlice({
	name: 'ltlTotalCharge',
	initialState,
	reducers: {
		updateLTLTotalCharge: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateLTLTotalCharge } = ltlTotalChargeSlice.actions;
export default ltlTotalChargeSlice.reducer;
