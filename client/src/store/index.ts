import { configureStore } from '@reduxjs/toolkit';
import shipmentsSlice from './features/shipmentsSlice';

export const store = configureStore({
	reducer: {
		shipments: shipmentsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
