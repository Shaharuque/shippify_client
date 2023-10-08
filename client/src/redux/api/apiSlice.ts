import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice: any = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_BACKEND_URL}/`,
		// prepareHeaders: (headers) => {
		// 	const authToken = localStorage.getItem('token');
		// 	if (authToken) {
		// 		headers.set('x-auth-token', authToken);
		// 	}

		// 	return headers;
		// },
	}),
	tagTypes: [],
	endpoints: () => ({}),
});
