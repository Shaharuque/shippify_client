import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormData } from '../../components/Basic shipment/multiStepperForBasic/senderAddressForm';
import { TPackageDetailsForm } from '../../components/Basic shipment/multiStepperForBasic/packageDetailsForm';
import { TCustomsDetailsForm } from '../../components/Basic shipment/multiStepperForBasic/customsInfoForm';
import { TReceiverAddressFormData } from '../../components/Basic shipment/multiStepperForBasic/recieverAddressForm';

export interface IBasicShipment {
	customs?: TCustomsDetailsForm;
	ship_from: TSenderAddressFormData;
	ship_to: TReceiverAddressFormData;
	packages: TPackageDetailsForm[];
}

export const initialShipmentsState: IBasicShipment = {
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
const basicShipmentsSlice = createSlice({
	name: 'basicShipments',
	initialState: initialShipmentsState,
	reducers: {
		updateField: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateField } = basicShipmentsSlice.actions;
export default basicShipmentsSlice.reducer;
