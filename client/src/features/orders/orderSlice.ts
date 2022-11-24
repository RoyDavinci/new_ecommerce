import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderInterface } from "../../interfaces/order";

const token = localStorage.getItem("token");

const initialState: orderInterface = {
	message: "loading",
	status: "idle",
	error: null,
	data: {
		orders: [
			{
				id: 1,
				order_code: "",
				product_detail: [{ id: 1, name: "" }],
				name: "",
				email: "",
				phone: "",
				total_amount: "",
				userId: null,
				guestId: null,
				status: "processing",
				payment_type: "",
				delivery_type: "",
				quantity: 1,
				address: "",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
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

	// try {
	// 	const { data } = await privateRequest.get(
	// 		"http://localhost:8090/api/v1/order/order"
	// 	);
	// 	return data;
	// } catch (error) {
	// 	const err = error as AxiosError<payloadErrorResponse>;

	// 	return thunkAPI.rejectWithValue(err?.response?.data);
	// }
});

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
