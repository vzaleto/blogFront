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

    const text = currentPost?.content.trim();
    const first = text?.charAt(0);
    const rest = text?.slice(1);

    return (
        <div>
            {
                currentPost ?

                    <div className=" rounded-2xl shadow-sm p-6">
                        <span className="text-lg">{new Date(currentPost.createdAt || '').toLocaleDateString()}</span>
                        <h2 className="text-3xl font-semibold mb-6 mt-4">{currentPost.title}</h2>
                        <img src={`${import.meta.env.VITE_API_URL}/uploads/${currentPost.image}`} alt=""
                             className="w-full block object-cover rounded-xl mb-4"/>
                        <p className="text-gray-700 mb-6 mt-6">
                            <span className="float-left mr-3 text-7xl">{first}</span>
                            <span>{rest}</span>
                        </p>

                        {
                            currentPost.fullContent && currentPost.fullContent.map((item, index) => {

                                    const text = item?.description.trim();
                                    const first = text?.charAt(0);
                                    const rest = text?.slice(1);

                                    return (
                                        <div key={index} className="mb-6">
                                            <h3 className="text-2xl font-semibold mb-6 mt-4">{item.title}</h3>

                                            <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`} alt=""
                                                 className=" w-full h-96 object-cover block rounded-xl mb-4"/>
                                            <p className="text-gray-600">
                                                <span className="float-left mr-3 text-7xl">{first}</span>
                                                <span>{rest}</span>
                                            </p>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    : <p> "no post" </p>
            }
        </div>
    )

};

export default PostByPost;