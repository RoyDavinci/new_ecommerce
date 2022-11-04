import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AppInitialState {
	toggle: boolean;
}

const initialState: AppInitialState = {
	toggle: false,
};

export const stateSlice = createSlice({
	name: "toggler",
	initialState,
	reducers: {
		changeState: (state: AppInitialState) => {
			return {
				...state,
				toggle: !state.toggle,
			};
		},
	},
});

export const { changeState } = stateSlice.actions;

export const defaultState = (state: RootState) => state.toggler.toggle;

export const stateReducer = stateSlice.reducer;
