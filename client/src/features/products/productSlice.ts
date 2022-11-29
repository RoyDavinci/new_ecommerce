import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateRequest, publicRequest } from "../../api/client";
import {
	AllProductInterface,
	productAddInterface,
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
	productError: null,
};

const productInitialState: AllProductInterface = {
	message: "starting",
	status: "idle",
	error: {},
	data: [],
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
export const editProducts = async (id: number, form: FormData) => {
	try {
		const { data } = await privateRequest.patch(
			`http://localhost:8090/api/v1/product/${id}`,
			form
		);
		return data;
	} catch (error) {
		const err = error as AxiosError<payloadErrorResponse>;

		return err?.response?.data;
	}
};

export const getSingleProduct = async (id: number) => {
	try {
		const { data } = await privateRequest.get(
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
		const response = await fetch(
			`http://localhost:8090/api/v1/product/add-product`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: item,
			}
		);
		const data = await response.json();
		if (response.status < 200 || response.status >= 300) {
			return thunkAPI.rejectWithValue(data);
		}
		return data;
	}
);

export const getProductSlice = createSlice({
	name: "allProducts",
	initialState: productInitialState,
	reducers: {
		filterProduct: (state, action) => {
			const filtered = state.data.filter(
				(item) => item.price <= action.payload
			);
			state.data = filtered;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
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
		builder.addCase(addProduct.pending, (state) => {
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
			state.message = "failed";
		});
	},
});

export const { filterProduct } = getProductSlice.actions;

export const productReducer = productSlice.reducer;

export const getProductReducer = getProductSlice.reducer;
