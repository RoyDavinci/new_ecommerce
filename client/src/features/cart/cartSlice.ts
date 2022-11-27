import { createSlice } from "@reduxjs/toolkit";

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
	total_amount: number;
	total_quantity: number;
}

export const initialState: AllCartInterface = {
	status: "idle",
	error: null,
	data: [],
	total_amount: 0,
	total_quantity: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let item = state.data.find((data) => data.id === action.payload.id);
			if (item) return;
			const items = { ...action.payload, quantity: 1 };
			state.data.push(items);
		},
		removeFromCart: (state, action) => {
			let item = state.data.filter((item) => item.id !== action.payload.id);
			state.data = item;
		},
		increaseQuantity: (state, action) => {
			let items = state.data.filter((data) => data.id === action.payload.id);
			items[0].quantity++;
			// item?.quantity && item.quantity++;
		},
		decreaseQuantity: (state, action) => {
			let items = state.data.filter((data) => data.id === action.payload.id);
			if (items[0].quantity <= 0) return;
			items[0].quantity--;

			// item?.quantity && item.quantity--;
		},
		calculateTotal: (state) => {
			let sum = 0;
			state.data.forEach((item) => {
				sum += Number(item.price) * item.quantity;
			});
			state.total_amount = sum;
		},
		calculateTotalQuantity: (state) => {
			let sum = 0;
			state.data.forEach((item) => {
				sum += item.quantity;
			});
			state.total_quantity = sum;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	calculateTotal,
	calculateTotalQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;