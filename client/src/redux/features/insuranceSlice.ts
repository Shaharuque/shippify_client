import { createSlice } from '@reduxjs/toolkit';

export interface Insurance {
	already_purchased?: boolean;
	product_value?: number;
	insurance_amount: number;
	terms_and_agreement: boolean;
}

const initialInsuranceValue: Insurance = {
	already_purchased: false,
	product_value: 0,
	insurance_amount: 0,
	terms_and_agreement: false,
};

const insuranceSlice = createSlice({
	name: 'insurance',
	initialState: initialInsuranceValue,
	reducers: {
		updateInsurance: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateInsurance } = insuranceSlice.actions;
export default insuranceSlice.reducer;
