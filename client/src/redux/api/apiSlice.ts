import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice: any = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/`,
	}),
	tagTypes: [],
	endpoints: () => ({}),
});
