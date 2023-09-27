import { apiSlice } from './apiSlice';

export const chartApi = apiSlice.injectEndpoints({
	endpoint: (builder: any) => ({
		fetchPieChartData: builder.query({
			query: (token: string) => ({
				url: '',
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'x-auth-token': token,
				},
			}),
		}),
	}),
});

export const { useFetchPieChartDataQuery } = chartApi;
