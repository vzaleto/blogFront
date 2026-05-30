import {apiClient} from "../../api/postApi.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Category} from "../../Types/types.ts";

interface CategoryItem extends Category {
    id: number;
}

interface CategoryState {
    categories: CategoryItem[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

export const createCategory = createAsyncThunk(
    'categoryCreate/create',
    async (category: Category) => {
        const response = await apiClient.post('/category', category);
        return response.data;
    });

export const fetchCategories = createAsyncThunk('getCategory/create',
    async () => {
        const response = await apiClient.get('/category');
        return response.data;

    })

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    success: false

}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //getCategory

            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.error = null;
                state.categories = payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            })
            // createCategory
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                 // state.categories.push(payload);
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create category';
            })
    }

})

export const {resetSuccess} = categorySlice.actions;
export default categorySlice.reducer
