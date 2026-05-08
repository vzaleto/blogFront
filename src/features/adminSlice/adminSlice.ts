import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { apiClient } from "../../api/postApi.ts";
import {AxiosError} from "axios";
import {AdmitToken} from "../../Types/types.ts";

export const adminLoginPassword = createAsyncThunk(
    'postCard/fetchLoginAdmin',
    async ({username, password}: { username: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`/admin/login`, {username, password});
            return response.data.token
        } catch (error) {
            console.error('Error in fetchPostsSearch:', error);
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    }
)

const initialState: AdmitToken = {
    token: null,
    status: 'idle',
    error: null,
    isAuth: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuth = false;
            localStorage.removeItem('token');
        },
        setAuthTokenFromStorage: (state) => {

            const token = localStorage.getItem('token') || null;
            if (token) {
                state.token = token
                state.isAuth = true
            }else {
                state.token = null
                state.isAuth = false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminLoginPassword.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(adminLoginPassword.fulfilled, (state, {payload}) => {
            state.status = 'succeeded';
            state.token = payload;
            state.error = null;
            state.isAuth = true;
            localStorage.setItem('token', payload);
        })
        builder.addCase(adminLoginPassword.rejected, (state, {payload}) => {
            state.status = 'failed';
            state.error = payload as string;
        })
    }
})

export const {logout, setAuthTokenFromStorage} = adminSlice.actions
export default adminSlice.reducer