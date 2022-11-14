import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
	SerializedError,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateRequest, publicRequest } from "../../api/client";
import { productErrorResponse } from "../../interfaces/product";

export interface statusInitial {
	data: [];
	message?: string;
	status: "idle" | "fulfilled" | "rejected";
	error: unknown;
}

const initialState: statusInitial = {
	status: "idle",
	data: [],
	error: { message: "" },
};

const token = localStorage.getItem("token");

export const createProduct = createAsyncThunk<{
	rejectValue: productErrorResponse;
}>("users", async (item, { rejectWithValue }) => {
	try {
		const { data } = await publicRequest.post(
			"http://localhost:8090/api/v1/product/add-product",
			item,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return data.product;
	} catch (err) {
		const error = err as AxiosError<productErrorResponse>;
		return rejectWithValue(error?.response?.data.message);
	}
});

export const getProductSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createProduct.pending, (state, action) => {
			state.message = "idle";
			state.status = "idle";
		});
		builder.addCase(createProduct.fulfilled, (state, action) => {
			state.message = "successful";
			state.status = "fulfilled";
			// state.data = action.payload;
		});
		builder.addCase(createProduct.rejected, (state, action) => {
			if (action.payload) {
				// Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
				state.error = action.payload;
			} else {
				state.error = action.error;
			}
		});
	},
});
