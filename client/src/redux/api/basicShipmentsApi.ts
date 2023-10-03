import { IBasicShipment } from '../features/basicShipmentsSlice';
import { apiSlice } from './apiSlice';

export const basicShipmentsApi = apiSlice.injectEndpoints({
	endpoints: (builder: any) => ({
		fetchRates: builder.mutation({
			query: ({ shipments, token }: { shipments: IBasicShipment[]; token: string }) => ({
				url: '/shipment/rates',
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'x-auth-token': token,
				},
				body: { shipments },
			}),
		}),

		fetchSingleShipment: builder.mutation({
			query: ({token,id}: { id: string; token: string }) => ({
				url: `/shipment/shipment-detail/${id}`,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'x-auth-token': token,
				},
			}),
		}),
	}),
});

export const { useFetchRatesMutation,useFetchSingleShipmentMutation } = basicShipmentsApi;
