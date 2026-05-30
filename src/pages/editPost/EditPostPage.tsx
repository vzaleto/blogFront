import PostCreate from "../../components/postCreate/PostCreate.tsx";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPostById} from "../../features/postSlise/postSlice.ts";
import {useParams} from "react-router-dom";

export const EditPostPage = ()=>{
    const {currentPost} = useSelector((state: RootState) => state.posts);
    const dispatch:AppDispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        if(id){
            dispatch(fetchPostById(Number(id)))
        }

    }, [id,dispatch]);

    if(!currentPost) return <div>Loading...</div>;

    console.log(currentPost)
    return (
        <div>
          <PostCreate initialData={currentPost}/>
        </div>
    )
}