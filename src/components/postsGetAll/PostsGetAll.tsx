import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPosts, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import {Tag} from "../../Types/types.ts";
import GetTags from "../getTags/GetTags.tsx";

const PostsGetAll = () => {

    const {posts} = useSelector((state: RootState) => state.posts); // 4
    const dispatch: AppDispatch = useDispatch();
    // const location = useLocation()

    useEffect(() => {
        dispatch(resetPosts())
        dispatch(fetchPosts())//1
        setFiltered(false)
    }, [dispatch]); //location.pathname

    return (
        <div>
            <GetTags/>
            {
                posts.length ? // 5
                    posts.map((elem) => (
                        <div style={{border: '1px solid black '}} key={elem.id}>
                            <span>{elem.id}</span>
                            <div>{elem.title}</div>
                            <div>{elem.content}</div>
                            <div>{elem.image}</div>
                            <div>
                                <h4 className='m-0'>Tags:</h4>
                                {
                                    elem.tags && elem.tags.length ?
                                        elem.tags.map((tag: Tag) => (
                                            <div key={tag.id}>{tag.name}</div>
                                        )) : <p>"no tags"</p>
                                }
                            </div>
                            {/*<Link to={`/tag/${tag.name}`}>{tag.name}</Link>*/}
                            {/*    <Link to={`/post/${elem.id}`} type='button'> learn more</Link>*/}
                        </div>
                    )) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostsGetAll;