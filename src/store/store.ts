import postSlice from "../features/postSlise/postSlice.ts";
import {configureStore} from "@reduxjs/toolkit";
import tagSlice from "../features/tagSlice/tagSlice.ts";
import adminSlice from "../features/adminSlice/adminSlice.ts";

export const store = configureStore({
    reducer: {
        posts: postSlice,
        tags:tagSlice,
        auth: adminSlice
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;