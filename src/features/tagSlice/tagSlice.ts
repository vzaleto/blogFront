import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../../api/postApi.ts";

import {Tag} from "../../Types/types.ts";

export const fetchTags = createAsyncThunk(
    'tagSlice/fetchTags',
    async () => {

        const response = await apiClient.get('/tags')
        return response.data
    }
)
interface TagState{
    tags: Tag[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}
const initialState:TagState = {
    tags: [],
    status: 'idle',
    error: null
}

const tagSlice = createSlice({
    name:"tags",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags = action.payload;
                state.status = 'succeeded'
        })
            .addCase(fetchTags.rejected, (state, action) => {
              state.error = (action.payload as string) || 'something went wrong';
              state.status = 'failed';
            })
    }

})

export default tagSlice.reducer