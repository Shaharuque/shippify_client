import { createSlice } from '@reduxjs/toolkit';

export interface IPaymentData {
	insurance_amount: string;
	bnpl?: {
		net_payable: string;
		numberOfInstallments: number;
		first_payable: string;
		currentDate: string;
	};
}

const initialPaymentData = {
	insurance_amount: '',
	bnpl: {
		net_payable: '',
		numberOfInstallments: 0,
		first_payable: '0',
		currentDate: '',
	},
};

const paymentSlice = createSlice({
	name: 'payment',
	initialState: initialPaymentData,
	reducers: {
		updatePayment: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updatePayment } = paymentSlice.actions;
export default paymentSlice.reducer;
