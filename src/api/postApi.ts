import axios from "axios";
import {store} from "../store/store.ts";
const API_URL = 'http://localhost:3000/api';

// export const fetchPostsApi =  () => axios.get(`${API_URL}/posts`);
// export const fetchPostByIdApi = (id:number) => axios.get(`${API_URL}/posts/${id}`;

const apiClient = axios.create({
    baseURL:`${API_URL}`,
    headers: {
        "Content-type": "application/json",
    }
});
apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apiClient