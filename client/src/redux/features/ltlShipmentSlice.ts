import { createSlice } from '@reduxjs/toolkit';
import { TSenderAddressFormDataLTL } from '../../components/LTL shipment/Multi stepper for LTL/senderAddressFormLTL';
import { TRecieverAddressFormDataLTL } from '../../components/LTL shipment/Multi stepper for LTL/recieverAddressFormLTL';
import { TPackageDetailsFormLTL } from '../../components/LTL shipment/Multi stepper for LTL/packageDetailsFormLTL';
import { TOption, TBillingInfo, TRequestedBy } from '../../components/LTL shipment/Multi stepper for LTL/servicesAndBillingDetailsForm';

export interface ILTLShipment {
	shipment: { ship_from: TSenderAddressFormDataLTL; ship_to: TRecieverAddressFormDataLTL; packages: TPackageDetailsFormLTL[]; service_code: string; pickup_date: string; options: TOption[]; bill_to: TBillingInfo; requested_by: TRequestedBy };

	shipment_measurements: TShipmentMeasurements;
}

export type TShipmentMeasurements = {
	total_linear_length: {
		value: number;
		unit: string;
	};
	total_width: {
		value: number;
		unit: string;
	};
	total_height: {
		value: number;
		unit: string;
	};
	total_weight: {
		value: number;
		unit: string;
	};
};

export const initialLTLShipmentState: ILTLShipment = {
	shipment: {
		ship_from: {
			contact: {
				name: '',
				email: '',
				phone_number: '',
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
				phone_number: '',
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
		packages: [],
		service_code: 'gtd_am',
		pickup_date: '',
		options: [],
		bill_to: {
			type: 'prepaid',
			payment_terms: 'prepaid',
			account: '123456',
			address: {
				company_name: '',
				address_line1: '',
				city_locality: '',
				state_province: '',
				postal_code: '',
				country_code: '',
			},
			contact: {
				name: '',
				phone_number: '',
				email: '',
			},
		},
		requested_by: {
			company_name: '',
			contact: {
				name: '',
				phone_number: '',
				email: '',
			},
		},
	},

	shipment_measurements: {
		total_linear_length: {
			value: 1200,
			unit: 'inches',
		},
		total_width: {
			value: 1000,
			unit: 'inches',
		},
		total_height: {
			value: 1000,
			unit: 'inches',
		},
		total_weight: {
			value: 1000,
			unit: 'pounds',
		},
	},
};

const ltlShipmentSlice = createSlice({
	name: 'ltlShipments',
	initialState: initialLTLShipmentState,
	reducers: {
		updateField: (state, action) => {
			const newShipmentState = { ...state.shipment, ...action.payload };
			state.shipment = newShipmentState;
			return state;
		},
	},
});

export const { updateField } = ltlShipmentSlice.actions;
export default ltlShipmentSlice.reducer;
