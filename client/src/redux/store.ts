import { configureStore } from '@reduxjs/toolkit';
import shipmentsSlice from './features/shipmentsSlice';
import { apiSlice } from './api/apiSlice';
import rateDetailsSlice from './features/rateDetailsSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		shipments: shipmentsSlice,
		rateDetails: rateDetailsSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
