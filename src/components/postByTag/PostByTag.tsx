import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchPostsByTagName, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import {Tag} from "../../Types/types.ts";


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
                        <div key={elem.id}>
                            <div>{elem.title}</div>
                            <div>{elem.content}</div>
                            <div>{elem.image}</div>
                            <div>
                                <h4 className='m-0' >Tags:</h4>
                                {
                                    elem.tags && elem.tags.length ?

                                        elem.tags.map((tag: Tag) => (


                                            <div key={tag.id}>{tag.name}</div>

                                        ))

                                        : <p>"no tags"</p>

                                }
                            </div>
                            <button type='button'> learn more</button>
                        </div>
                    )) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostByTag;