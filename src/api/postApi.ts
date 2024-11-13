import axios from "axios";
const API_URL = 'http://localhost:3000/api';

// export const fetchPostsApi =  () => axios.get(`${API_URL}/posts`);
// export const fetchPostByIdApi = (id:number) => axios.get(`${API_URL}/posts/${id}`

const apiClient = axios.create({
    baseURL:`${API_URL}`,
    headers: {
        "Content-type": "application/json",
    }
});
export default apiClient