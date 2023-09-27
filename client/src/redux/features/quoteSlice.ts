import { createSlice } from '@reduxjs/toolkit';

export interface IQuoteData {
	carrier_message: string | null;
	carrier_quote_id: string;
	charges: {
		amount: {
			currency: string;
			value: string;
		};
		description: string;
		type: string;
	}[];
	effective_date: string | null;
	estimated_delivery_days: number;
	expiration_date: string | null;
	pickup_date: string;
	quote_id: string;
	quote_type: string | null;
}

const initialQuoteValues: IQuoteData = {
	carrier_message: null,
	carrier_quote_id: '',
	charges: [
		{
			amount: {
				currency: '',
				value: '',
			},
			description: '',
			type: '',
		},
	],
	effective_date: null,
	estimated_delivery_days: 0,
	expiration_date: null,
	pickup_date: '',
	quote_id: '',
	quote_type: null,
};

const quoteSlice = createSlice({
	name: 'quote',
	initialState: initialQuoteValues,
	reducers: {
		updateQuote: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
