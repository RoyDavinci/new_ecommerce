import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateRequest, publicRequest } from "../../api/client";
import {
	AllProductInterface,
	productAddInterface,
	ProductInterface,
} from "../../interfaces/product";
import { payloadErrorResponse } from "../../interfaces/userinterfaces";

const initialState: productAddInterface = {
	message: "loading",
	data: {
		name: "",
		sellerId: null,
		adminId: null,
		model: "",
		make: "",
		description: "",
		quantity: 0,
		price: "",
		year: "",
		createdAt: "",
		updatedAt: "",
		categoryName: "",
		product: "",
	},
	productStatus: "idle",
	error: {},
	productError: { message: "" },
};

const productInitialState: AllProductInterface = {
	message: "starting",
	status: "idle",
	error: {},
	data: [
		{
			id: 0,
			name: "",
			images: ["image"],
			quantity: 1,
			price: 0,
			make: "",
			model: "",
			year: "",
			description: "",
		},
	],
};

const token = localStorage.getItem("token");

export const deleteProducts = async (id: number) => {
	try {
		const { data } = await privateRequest.delete(
			`http://localhost:8090/api/v1/product/${id}`
		);
		return data;
	} catch (error) {
		const err = error as AxiosError<payloadErrorResponse>;

		return err?.response?.data;
	}
};

export const getProducts = createAsyncThunk("items", async (item, thunkAPI) => {
	try {
		const { data } = await publicRequest.get(
			"http://localhost:8090/api/v1/product/"
		);
		return data.message;
	} catch (error) {
		if (error instanceof AxiosError) {
			const message = error?.response?.data.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
});

export const addProduct = createAsyncThunk(
	"data",
	async (item: FormData, thunkAPI) => {
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
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({
				message: err.response?.data.message,
			});
		}
	}
);

export const getProductSlice = createSlice({
	name: "allProducts",
	initialState: productInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state, action) => {
			state.status = "idle";
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
		});
		builder.addCase(getProducts.rejected, (state, action) => {
			state.error = action.error;
			state.status = "failed";
		});
	},
});

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addProduct.pending, (state, action) => {
			state.message = "idle";
			state.productStatus = "idle";
		});
		builder.addCase(addProduct.fulfilled, (state, action) => {
			state.message = "successful";
			state.productStatus = "successful";
			state.data = action.payload;
		});
		builder.addCase(addProduct.rejected, (state, action) => {
			state.productStatus = "failed";
			state.error = action.error;
			state.productError = action.payload;
		});
	},
});

export const productReducer = productSlice.reducer;

export const getProductReducer = getProductSlice.reducer;
