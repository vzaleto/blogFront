import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPosts, fetchPostsSearch, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import GetTags from "../getTags/GetTags.tsx";
import PostCard from "../postCard/PostCard.tsx";
import {useSearchParams} from 'react-router-dom';

const PostsGetAll = () => {

    const {posts} = useSelector((state: RootState) => state.posts);
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('query')?.trim() || '';

    useEffect(() => {

        if (!searchQuery) {

            dispatch(resetPosts())
            dispatch(fetchPosts())
            dispatch(setFiltered(false))
        } else {

            dispatch(fetchPostsSearch(searchQuery))
        }

    }, [dispatch, searchQuery]); //location.pathname


    return (
        <div>
            <GetTags/>
            {
                posts && posts.length ?
                    posts.map((elem) => (
                        <PostCard key={elem.id} elem={elem}/>
                    )) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostsGetAll;