import { ILTLShipment } from '../features/ltlShipmentSlice';
import { apiSlice } from './apiSlice';

export const ltlShipmentsApi = apiSlice.injectEndpoints({
	endpoints: (builder: any) => ({
		fetchLTLOptions: builder.query({
			query: (token: string) => ({
				url: '/ltlShipment/carrier-detail',
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'x-auth-token': token,
				},
			}),
		}),
		fetchQuote: builder.mutation({
			query: ({ data, token }: { data: ILTLShipment; token: string }) => ({
				url: '/ltlShipment/request-for-quote',
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'x-auth-token': token,
				},
				body: data,
			}),
		}),
	}),
});

export const { useFetchLTLOptionsQuery, useFetchQuoteMutation } = ltlShipmentsApi;
