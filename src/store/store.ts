import postSlice from "../features/postSlise/postSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import tagSlice from "../features/tagSlice/tagSlice.ts";
import adminSlice from "../features/adminSlice/adminSlice.ts";
import categorySlice from "../features/categorySlice/categorySlice.ts";

export const store = configureStore({
    reducer: {
        auth: adminSlice,
        posts: postSlice,
        tags:tagSlice,
        categories: categorySlice

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

