import postSlice from "../features/postSlise/postSlice.ts";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        posts: postSlice,
    },
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;