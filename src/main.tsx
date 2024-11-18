import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PostByTag from "./components/postByTag/PostByTag.tsx";
import PostsGetAll from "./components/postsGetAll/PostsGetAll.tsx";
import PostCreate from "./components/postCreate/PostCreate.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/',
                element: <PostsGetAll/>
            },
            {
                path: "tag/:tagName",
                element: <PostByTag/>
            },
            {
                path: "/postCreate",
                element:   <PostCreate/>
            },
            {
                path: "/post/:id",
                element:   <PostCreate/>
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
