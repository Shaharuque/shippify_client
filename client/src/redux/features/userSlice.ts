import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
	name: string;
	company_name: string;
	address_line1: string;
	city_locality: string;
	state_province: string;
	postal_code: string;
	country_code: string;
	phone: string;
}

const initialUserValues: IUser = {
	name: 'John Doe',
	company_name: 'Example Corp.',
	address_line1: '4009 Marathon Blvd',
	city_locality: 'Austin',
	state_province: 'TX',
	postal_code: '78756',
	country_code: 'US',
	phone: '512-555-5555',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserValues,
	reducers: {
		updateUser: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
