import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
	payloadErrorResponse,
	userInfo,
	UserState,
} from "../../interfaces/userinterfaces";
import { publicRequest } from "../../api/client";

const initialState: UserState = {
	message: "",
	status: "idle",
	data: {
		success: false,
		token: "",
		validity: "",
		data: { user: { id: 0, email: "", token: "", name: "" } },
	},
	error: {},
};

export const loginAdmin = createAsyncThunk(
	"login",
	async (item: userInfo, thunkAPI) => {
		try {
			const { data } = await publicRequest.post("/user/signin", item);
			return data;
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({ message: err.response?.data.message });
		}
	}
);

export const authSlice = createSlice({
	name: "login",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginAdmin.pending, (state) => {
			state.status = "idle";
		});
		builder.addCase(loginAdmin.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
			localStorage.setItem("token", state.data.token);
			localStorage.setItem("user", JSON.stringify(state.data.data.user));
		});
		builder.addCase(loginAdmin.rejected, (state, action) => {
			state.error = action.error;
			state.status = "failed";
		});
	},
});

export const authReducer = authSlice.reducer;
