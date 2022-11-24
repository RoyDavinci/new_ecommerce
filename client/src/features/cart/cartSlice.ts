import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface cartInterface {
	adminId: number | null;
	sellerId: number | null;
	createdAt: Date;
	description: string;
	id: number;
	images: [string];
	make: string;
	model: string;
	name: string;
	price: string;
	quantity: number;
	year: string;
}

export interface AllCartInterface {
	data: cartInterface[];
	error: unknown;
	status: "idle" | "loading" | "failed" | "successful";
}

export const initialState: AllCartInterface = {
	status: "idle",
	error: null,
	data: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let item = state.data.find((data) => data.id === action.payload.id);
			if (item) return;
			state.data.push(action.payload);
		},
		removeFromCart: (state, action) => {
			let item = state.data.filter((item) => item.id !== action.payload.id);
			state.data = item;
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
