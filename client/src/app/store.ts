import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authenticateUser";
import { categoryReducer } from "../features/categories/cateorySlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
