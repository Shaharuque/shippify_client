import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormData } from '../../components/Home page components/multiStepperForBasic/senderAddress';
import { TRecieverAddressFormData } from '../../components/Home page components/multiStepperForBasic/recieverAddressForm';
import { TPackageDetailsForm } from '../../components/Home page components/multiStepperForBasic/packageDetailsForm';

export interface Ishipment {
	ship_from: TSenderAddressFormData;
	ship_to: TRecieverAddressFormData;
	packages: TPackageDetailsForm[];
}

export const initialShipmentsState: Ishipment = {
	ship_from: {
		name: '',
		company_name: '',
		address_line1: '',
		city_locality: '',
		state_province: '',
		postal_code: '',
		country_code: '',
		phone: '',
	},
	ship_to: {
		name: '',

		address_line1: '',
		city_locality: '',
		state_province: '',
		postal_code: '',
		country_code: '',
	},
	packages: [],
};
const shipmentsSlice = createSlice({
	name: 'shipments',
	initialState: initialShipmentsState,
	reducers: {
		updateField: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateField } = shipmentsSlice.actions;
export default shipmentsSlice.reducer;
