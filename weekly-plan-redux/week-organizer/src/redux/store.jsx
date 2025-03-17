import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./slices/planSlice"

export const store = configureStore({
    reducer: {
        plan: planReducer,

    }
})