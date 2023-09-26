import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormDataLTL } from '../../components/LTL shipment/Multi stepper for LTL/senderAddressFormLTL';
import { TRecieverAddressFormDataLTL } from '../../components/LTL shipment/Multi stepper for LTL/recieverAddressFormLTL';
import { TPackageDetailsFormLTL } from '../../components/LTL shipment/Multi stepper for LTL/packageDetailsFormLTL';

export interface ILTLShipment {
	ship_from: TSenderAddressFormDataLTL;
	ship_to: TRecieverAddressFormDataLTL;
	packages: TPackageDetailsFormLTL[];
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
	packages: [
		{
			code: 'pkg',
			freight_class: 200,
			nmfc_code: '',
			description: '',
			dimensions: {
				width: 0,
				height: 0,
				length: 0,
				unit: 'inches',
			},
			weight: {
				value: 0,
				unit: 'pounds',
			},
			quantity: 1,
			stackable: false,
			hazardous_materials: false,
		},
	],
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
