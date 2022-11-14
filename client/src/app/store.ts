import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authenticateUser";
import { categoryReducer } from "../features/categories/cateorySlice";
import {
	getProductReducer,
	productReducer,
} from "../features/products/productSlice";
import { stateReducer } from "../features/state/state";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		toggler: stateReducer,
		products: productReducer,
		allProducts: getProductReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
