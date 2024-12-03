import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPosts, fetchPostsSearch, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import GetTags from "../getTags/GetTags.tsx";
import PostCard from "../postCard/PostCard.tsx";
import {Link, useSearchParams} from 'react-router-dom';

const PostsGetAll = () => {

    const {posts} = useSelector((state: RootState) => state.posts); // 4
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('query')?.trim() || ''
    const {token} = useSelector((state:RootState)=>state.auth)
    // const location = useLocation()
    console.log(searchQuery)
    useEffect(() => {
        console.log(searchQuery)
        if (!searchQuery) {
            console.log('no lox')
            dispatch(resetPosts())
            dispatch(fetchPosts())//1
            dispatch(setFiltered(false))
        } else {
            console.log('lox')
            dispatch(fetchPostsSearch(searchQuery))
        }

    }, [dispatch, searchQuery]); //location.pathname

    return (
        <div>
            {token && (
                <Link to={`/postCreate`}>
                    <button>Create</button>
                </Link>
            )}

            <GetTags/>
            {
                posts && posts.length ? // 5
                    posts.map((elem) => (
                        <PostCard key={elem.id} elem={elem}/>
                    )) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostsGetAll;