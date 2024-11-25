import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchPostsByTagName, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import PostCard from "../postCard/PostCard.tsx";


const PostByTag = () => {

    const {tagName} = useParams<{tagName: string }>();
    const {posts, status} = useSelector((state:RootState)=> state.posts);
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(resetPosts())
        if(tagName) {
            dispatch(fetchPostsByTagName(tagName))
            dispatch(setFiltered(true))
        }
    }, [dispatch, tagName]);

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{status}</p>}
            {
                posts.length ? // 5
                    posts.map((elem)=>(
                        <PostCard key={elem.id} elem={elem} />
                    )) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostByTag;