import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormData } from '../../components/Home page components/multiStepperForBasic/senderAddressForm';
import { TRecieverAddressFormData } from '../../components/Home page components/multiStepperForBasic/recieverAddressForm';
import { TPackageDetailsForm } from '../../components/Home page components/multiStepperForBasic/packageDetailsForm';
import { TCustomsDetailsForm } from '../../components/Home page components/multiStepperForBasic/customsInfoForm';

export interface IShipment {
	customs?: TCustomsDetailsForm;
	ship_from: TSenderAddressFormData;
	ship_to: TRecieverAddressFormData;
	packages: TPackageDetailsForm[];
}

export const initialShipmentsState: IShipment = {
	customs: {
		contents: 'merchandise',
		contents_explanation: '',
		non_delivery: 'return_to_sender',
		customs_items: [
			{
				harmonized_tariff_code: '',
				country_of_manufacture: '',
				country_of_origin: '',
				description: '',
				quantity: 0,
				value: {
					currency: '',
					amount: 0,
				},
			},
		],
	},
	ship_from: {
		name: '',
		company_name: '',
		address_line1: '',
		city_locality: '',
		state_province: '',
		postal_code: '',
		country_code: 'US',
		phone: '',
	},
	ship_to: {
		name: '',

		address_line1: '',
		city_locality: '',
		state_province: '',
		postal_code: '',
		country_code: 'US',
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
