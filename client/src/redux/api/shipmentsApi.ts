import { IShipment } from '../features/basicShipmentsSlice';
import { apiSlice } from './apiSlice';

export const shipmentsApi = apiSlice.injectEndpoints({
	endpoints: (builder: any) => ({
		fetchRates: builder.mutation({
			query: (data: { shipments: IShipment[] }) => ({
				url: '/shipment/rates',
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: data,
			}),
		}),
	}),
});

export const { useFetchRatesMutation } = shipmentsApi;
