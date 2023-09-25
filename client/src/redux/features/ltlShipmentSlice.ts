import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormDataLTL } from '../../components/LTL shipment/senderAddressFormLTL';
import { TRecieverAddressFormDataLTL } from '../../components/LTL shipment/recieverAddressFormLTL';

export interface ILTLShipment {
	ship_from: TSenderAddressFormDataLTL;
	ship_to: TRecieverAddressFormDataLTL;
}

export const initialLTLShipmentState: ILTLShipment = {
	ship_from: {
		contact: {
			name: '',
			email: '',
			phone: '',
		},
		address: {
			company_name: '',
			address_line1: '',
			city_locality: '',
			state_province: '',
			postal_code: '',
			country_code: 'US',
		},
	},
	ship_to: {
		contact: {
			name: '',
			email: '',
			phone: '',
		},
		address: {
			company_name: '',
			address_line1: '',
			city_locality: '',
			state_province: '',
			postal_code: '',
			country_code: 'US',
		},
	},
};

const ltlShipmentSlice = createSlice({
	name: 'ltlShipments',
	initialState: initialLTLShipmentState,
	reducers: {
		updateField: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateField } = ltlShipmentSlice.actions;
export default ltlShipmentSlice.reducer;
