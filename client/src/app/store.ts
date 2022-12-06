import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authenticateUser";
import { cartReducer } from "../features/cart/cartSlice";
import { categoryReducer } from "../features/categories/cateorySlice";
import { getOrder } from "../features/orders/orderSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
	getProductReducer,
	productReducer,
} from "../features/products/productSlice";
import { stateReducer } from "../features/state/state";

const persistConfig = {
	key: "root",
	storage,
};

let rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	toggler: stateReducer,
	products: productReducer,
	allProducts: getProductReducer,
	allOrder: getOrder,
	cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
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
export const persistor = persistStore(store);
