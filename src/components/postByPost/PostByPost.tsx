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
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <span>{new Date(currentPost.createdAt || '').toLocaleDateString()}</span>
                        <h2 className="text-3xl font-bold mb-4 ">{currentPost.title}</h2>
                        <img src={`http://localhost:3000/uploads/${currentPost.image}`} alt="" className="w-40 h-28 object-cover rounded-xl mb-4"/>
                        <div className="text-gray-700 mb-6">{currentPost.content}</div>

                        {currentPost.fullContent && currentPost.fullContent.map((item,  index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <img src={`http://localhost:3000/uploads/${item.image}`} alt="" className="rounded mb-2"/>
                                <p className="text-gray-600"> {item.description}</p>
                            </div>
                        ))}
                    </div>
                    : <p> "no post" </p>
            }
        </div>
    )

};

export default PostByPost;