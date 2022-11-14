import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { privateRequest, publicRequest } from "../../api/client";
import {
	AllProductInterface,
	productAddInterface,
	productErrorResponse,
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
	productError: null,
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

// export const updateUser = createAsyncThunk<
// 	{
// 		rejectValue: productErrorResponse;
// 	}
// >("users/update", async (item, { rejectWithValue }) => {
// 	try {
// 		const data: AxiosResponse  = await publicRequest.post(
// 			"http://localhost:8090/api/v1/product/add-product",
// 			item,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 					"Content-Type": "multipart/form-data",
// 				},
// 			}
// 		);
// 		return data.data.product;
// 	} catch (err) {
// 		// let error: AxiosError<productErrorResponse> = err;
//         const err = error as AxiosError<productErrorResponse>;// cast the error for access
// 		if (!error.response) {
// 			throw err;
// 		}
// 		// We got validation errors, let's return those so we can reference in our component and set form errors
// 		return rejectWithValue(error.response.data);
// 	}
// });

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
		const response = await fetch(`http://localhost:8090/api/v1/product/${id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: form,
		});
		const data = await response.json();
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
			state.message = "failed";
		});
	},
});

export const productReducer = productSlice.reducer;

export const getProductReducer = getProductSlice.reducer;
