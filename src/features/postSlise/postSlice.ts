import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {Post, PostsState} from "../../Types/types.ts";
import apiClient from "../../api/postApi.ts";

//2
export const fetchPosts = createAsyncThunk(
    'post/fetchPost',
    async () => {
        const response = await apiClient.get('/posts')
        return response.data
    }
)

//2create
export const createPost = createAsyncThunk(
    'post/createPost',
    async (newPost: Post, {dispatch}) => {
        const response = await apiClient.post('/postCreate', newPost)
        await dispatch(fetchPosts())
        return response.data
    }
)


const initialState: PostsState = {

    posts: [], //4create
    currentPost: undefined,
    status: 'idle',
    error: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setCurrentPost(state, action: PayloadAction<Post | undefined>) {
            state.currentPost = action.payload;

        }
    },
    extraReducers: (builder) => {
        builder
            //3
            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.posts = payload;
            })
            //3create
            .addCase(createPost.fulfilled, (state) => {
                state.status = 'succeeded'
                // state.posts.push(payload);
            })

            .addMatcher(
                isAnyOf(fetchPosts.pending, createPost.pending),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchPosts.rejected, createPost.rejected),
                (state, {payload}) => {
                    state.status = 'failed';
                    state.error = (payload as string) || 'Something went wrong';
                }
            )
    }


})

export default postSlice.reducer;
