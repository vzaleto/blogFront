import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostSlug} from "../../features/postSlise/postSlice.ts";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import PostCard from "../postCard/PostCard.tsx";

export const PostGetSlug = ()=>{
    const {slug} = useParams();
    const dispatch:AppDispatch = useDispatch();
     const {posts} = useSelector((state: RootState) => state.posts);

    console.log("slug",slug)

    useEffect(()=>{
        console.log("slug",slug)
        if(slug){
            dispatch(fetchPostSlug(slug))
        }

    },[slug,dispatch])

    console.log("posts",posts)

    return(
        <div>
            { posts ? posts.map((elem)=>(
                        <PostCard key={elem.id} elem={elem} />
            ))
                : <div>Loading...</div> }
        </div>
    )

}