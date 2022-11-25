import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { publicRequest } from "../../api/client";
import {
	categoryPayloadResponse,
	CategoryState,
} from "../../interfaces/category";
import { payloadErrorResponse } from "../../interfaces/userinterfaces";

const initialState: CategoryState = {
	message: "",
	status: "idle",
	categoryData: [],
	error: {},
};

export const getCategories = createAsyncThunk(
	"categories",
	async (item, thunkAPI) => {
		try {
			const { data } = await publicRequest.get("category");
			return data.getAllCategories;
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({
				message: err.response?.data.message,
			});
		}
	}
);

export const getCategoryByName = async (item: string) => {
	try {
		const { data } = await publicRequest.get(`product/category/${item}`);
		return data.message;
	} catch (error) {
		const err = error as AxiosError<payloadErrorResponse>;
		return err;
	}
};

export const categorySlice = createSlice({
	name: "categiory",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state, action) => {
			state.message = "pending";
			state.status = "loading";
		});
		builder.addCase(
			getCategories.fulfilled,
			(state, action: PayloadAction<categoryPayloadResponse[]>) => {
				state.message = "success";
				state.status = "successful";
				state.categoryData = action.payload;
			}
		);
		builder.addCase(getCategories.rejected, (state, action) => {
			state.error = action.error;
			state.status = "failed";
		});
	},
});

export const categoryReducer = categorySlice.reducer;
