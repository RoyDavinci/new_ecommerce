import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../api/client";
import { orderInterface, orders } from "../../interfaces/order";

const token = localStorage.getItem("token");

const initialState: orderInterface = {
	message: "loading",
	status: "idle",
	error: null,
	data: {
		orders: [],
	},
};

export const getOrders = createAsyncThunk("orders", async (item, thunkAPI) => {
	const response = await fetch("http://localhost:8090/api/v1/order/order", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	if (response.status < 200 || response.status >= 300) {
		return thunkAPI.rejectWithValue(data);
	}
	return data;
});

export const createOrders = async (orderData: object) => {
	try {
		const { data } = await publicRequest.post(
			"http://localhost:8090/api/v1/order/create/order",
			orderData
		);
		return data;
	} catch (error) {
		return error;
	}
};

export const getOrderSlice = createSlice({
	name: "allOrders",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getOrders.pending, (state) => {
			state.status = "idle";
		});
		builder.addCase(getOrders.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
		});
		builder.addCase(getOrders.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
	},
});

export const getOrder = getOrderSlice.reducer;
