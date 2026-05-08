import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import { PostsState} from "../../Types/types.ts";
import {apiClient, apiClientCreatePost} from "../../api/postApi.ts";
import {fetchTags} from "../tagSlice/tagSlice.ts";
import {AxiosError} from "axios";




export const fetchPosts = createAsyncThunk(
    'postCard/fetchPost',
    async () => {
        const response = await apiClient.get('/posts')
        return response.data
    }
)


export const createPost = createAsyncThunk(
    'postCard/createPost',
    async (newPost: FormData, {dispatch}) => {
        const response = await apiClientCreatePost.post('/postCreate', newPost)
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
    async (searchQuery:string, { rejectWithValue }) => {
        console.log('Sending search query:', searchQuery);

        try {
            console.log('Sending search query try:', searchQuery);
            const response = await apiClient.get(`/search`,{
                params: { query: searchQuery }
            });
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error in fetchPostsSearch:', error);
            if(error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    }
);
export const fetchPostDelete = createAsyncThunk(
    'postCard/fetchPostDelete',
    async (id: number) => {
        const response = await apiClient.delete(`/post/${id}`)
        return response.data
    }
)
const initialState: PostsState = {
    posts: [], //4create
    currentPost: undefined,
    status: 'idle',
    error: null,
    isFiltered: false,
    // token: JSON.parse(localStorage.getItem('tokenBlog') )  || null
    // token: localStorage.getItem('token')

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

        resetCurrentPost(state){
            state.currentPost = undefined
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchPosts.fulfilled, (state, {payload}) => {
                state.status = 'succeeded'
                state.posts = payload;
                state.isFiltered = false
            })

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
            .addCase(fetchPostDelete.fulfilled,(state,{payload})=>{
                state.status = 'succeeded';
                state.posts = state.posts.filter((elem)=> elem.id !== Number(payload.id));
            })
            .addMatcher(
                isAnyOf(fetchPosts.pending, createPost.pending, fetchPostsByTagName.pending,fetchPostsSearch.pending,fetchPostDelete.pending),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchPosts.rejected, createPost.rejected, fetchPostsByTagName.rejected,fetchPostsSearch.rejected,fetchPostDelete.rejected),
                (state, {payload}) => {
                    state.status = 'failed';
                    state.error = (payload as string) || 'Something went wrong';
                }
            )
    }


})


export  const {resetPosts, setFiltered, resetCurrentPost} = postSlice.actions
export default postSlice.reducer;
