import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import rateDetailsSlice from './features/rateDetailsSlice';
import ltlShipmentSlice from './features/ltlShipmentSlice';
import basicShipmentsSlice from './features/basicShipmentsSlice';
import quoteSlice from './features/quoteSlice';
import userSlice from './features/userSlice';
import selectedRateSlice from './features/selectedRateSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		basicShipments: basicShipmentsSlice,
		rateDetails: rateDetailsSlice,
		ltlShipments: ltlShipmentSlice,
		quote: quoteSlice,
		user: userSlice,
		selectedRate: selectedRateSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
