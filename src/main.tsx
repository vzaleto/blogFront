import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PostByTag from "./components/postByTag/PostByTag.tsx";
import PostCreate from "./components/postCreate/PostCreate.tsx";
import Home from "./pages/home/Home.tsx";
import PostsGetAll from "./components/postsGetAll/PostsGetAll.tsx";
import PostByPost from "./components/postByPost/PostByPost.tsx";

const router = createBrowserRouter([
    {

        path: "/",
        element: <App/>,

    children: [
    {
        path: '/',
        element: <Home/>,
        children: [

            {
                path: "/",
                element: <PostsGetAll/>
            },
            {
                path: "tag/:tagName",
                element: <PostByTag/>
            },
            {
                path: "/postCreate",
                element: <PostCreate/>
            },
            {
                path: "/post/:id",
                element: <PostByPost/>
            },
            {
                path: "/post/search",
                element: <PostsGetAll/>
            }

        ]
    }
]
}
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
