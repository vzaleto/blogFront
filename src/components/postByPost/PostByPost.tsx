import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPostById, resetCurrentPost} from "../../features/postSlise/postSlice.ts";

const PostByPost = () => {

    const {id} = useParams();
    const {currentPost} = useSelector((state: RootState) => state.posts);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(Number(id)))
        }
        return () => {
            dispatch(resetCurrentPost())
        }

    }, [dispatch, id]);

    return (
        <div>
            {
                currentPost ?
                    <div>
                        <div>{currentPost.title}</div>
                        <div>{currentPost.content}</div>
                        <img src={currentPost.image} alt=""/>
                        {currentPost.fullContent && currentPost.fullContent.map((item,  index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                <img src={item.image} alt=""/>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                    : <p> "no post" </p>
            }
        </div>
    )

};

export default PostByPost;