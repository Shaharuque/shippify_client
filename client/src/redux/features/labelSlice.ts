import { createSlice } from '@reduxjs/toolkit';

export interface Label {
    labelData : string;
    bolData : string;
}

const initialLabelValue: Label = {
    labelData : "",
    bolData : ""
};

const labelSlice = createSlice({
	name: 'label',
	initialState: initialLabelValue,
	reducers: {
		updateLabel: (state, action) => {
			// return { ...state, ...action.payload };
			state.labelData = action.payload;
		},
		updateBOL: (state, action) => {
			state.bolData = action.payload;
		},
	},
});

export const { updateLabel, updateBOL } = labelSlice.actions;
export default labelSlice.reducer;
