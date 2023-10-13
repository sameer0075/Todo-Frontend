import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todoSlice from "./Slices/todo.slice";
export const rootReducer = combineReducers({
	todos:todoSlice
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware(),
});