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
	}),
});

export const { useFetchLTLOptionsQuery } = ltlShipmentsApi;
