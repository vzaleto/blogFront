import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {Post, PostsState} from "../../Types/types.ts";
import apiClient from "../../api/postApi.ts";
import {fetchTags} from "../tagSlice/tagSlice.ts";

//2
export const fetchPosts = createAsyncThunk(
    'postCard/fetchPost',
    async () => {
        const response = await apiClient.get('/posts')
        return response.data
    }
)

//2create
export const createPost = createAsyncThunk(
    'postCard/createPost',
    async (newPost: Post, {dispatch}) => {
        const response = await apiClient.post('/postCreate', newPost)
        await dispatch(fetchPosts())
        await dispatch(fetchTags())
        return response.data
    }
)

export const fetchPostsByTagName = createAsyncThunk(
    'postCard/fetchPostsByTagName',
    async (tagName: string) => {
        const response = await apiClient.get(`/post/tag/${tagName}`)

        console.log(response.data)
        return response.data
    }
)

export const fetchPostById = createAsyncThunk(
    'postCard/fetchPostById',
    async (id: number) => {
        const response = await apiClient.get(`/post/${id}`)
        return response.data
    }
)
export const fetchPostsSearch = createAsyncThunk(
    'postCard/fetchPostsSearch',
    async (searchQuery: string, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`/post/search?query=${encodeURIComponent(searchQuery)}`)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message)
        }

    }
)

const initialState: PostsState = {
    posts: [], //4create
    currentPost: undefined,
    status: 'idle',
    error: null,
    isFiltered: false,

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
        },
        // getPostById(state, action:PayloadAction<number>){
        //  state.status = 'succeeded';
        //     state.currentPost = state.posts.find((post) => {
        //             return   post.id === action.payload
        //     }
        //     )
        // }
        resetCurrentPost(state){
            state.currentPost = undefined
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
            .addCase(fetchPostById.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.currentPost = payload;
            })
            .addCase(fetchPostsSearch.fulfilled,(state,{payload})=>{
                console.log(payload)
                state.status = 'succeeded';
                state.posts = payload;
            })

            .addMatcher(
                isAnyOf(fetchPosts.pending, createPost.pending, fetchPostsByTagName.pending,fetchPostsSearch.pending),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchPosts.rejected, createPost.rejected, fetchPostsByTagName.rejected,fetchPostsSearch.rejected),
                (state, {payload}) => {
                    state.status = 'failed';
                    state.error = (payload as string) || 'Something went wrong';
                }
            )
    }


})


export  const {resetPosts, setFiltered, resetCurrentPost} = postSlice.actions
export default postSlice.reducer;
