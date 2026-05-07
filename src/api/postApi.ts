import axios from "axios";
 const API_URL = 'http://localhost:3000/api';
//     const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// export const fetchPostsApi =  () => axios.get(`${API_URL}/posts`);
// export const fetchPostByIdApi = (id:number) => axios.get(`${API_URL}/posts/${id}`;

export const apiClient = axios.create({
    baseURL:`${API_URL}`,
    headers: {
        "Content-type": "application/json",
    }
});
export const apiClientCreatePost = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})
// apiClient.interceptors.request.use((config) => {
//
//     const token = localStorage.getItem("token");
//
//     if (token) {
//         if (!config.headers) {
//             config.headers = new AxiosHeaders();
//         }
//         config.headers.set("Authorization", `Bearer ${token}`);
//     }
//
//     return config;
// });

// export default {apiClient, apiClientCreatePost}
