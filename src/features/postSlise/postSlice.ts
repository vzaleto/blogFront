import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {Post, PostsState} from "../../Types/types.ts";
import apiClient from "../../api/postApi.ts";
import {fetchTags} from "../tagSlice/tagSlice.ts";

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
        await dispatch(fetchTags())
        return response.data
    }
)

export const fetchPostsByTagName = createAsyncThunk(
    'post/fetchPostsByTagName',
    async (tagName: string) => {
        const response = await apiClient.get(`/post/tag/${tagName}`)

        console.log(response.data)
        return response.data
    }
)


const initialState: PostsState = {
    posts: [], //4create
    currentPost: undefined,
    status: 'idle',
    error: null,
    isFiltered: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setFiltered(state, action: PayloadAction<boolean>) {
            state.isFiltered = action.payload;
        },
        resetPosts(state) {
            state.posts = []
            state.status = 'idle'
            state.isFiltered = false
        }
    },
    extraReducers: (builder) => {
        builder
            //3
            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.posts = payload;
                state.isFiltered = false
            })
            //3create
            .addCase(createPost.fulfilled, (state) => {
                state.status = 'succeeded'
                // state.posts.push(payload);
            })
            .addCase(fetchPostsByTagName.fulfilled,(state,{payload})=>{
                state.status = 'succeeded'
                state.posts = payload
                state.isFiltered = true
            })

            .addMatcher(
                isAnyOf(fetchPosts.pending, createPost.pending, fetchPostsByTagName.pending),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchPosts.rejected, createPost.rejected, fetchPostsByTagName.rejected),
                (state, {payload}) => {
                    state.status = 'failed';
                    state.error = (payload as string) || 'Something went wrong';
                }
            )
    }


})


export  const {resetPosts, setFiltered} = postSlice.actions
export default postSlice.reducer;
