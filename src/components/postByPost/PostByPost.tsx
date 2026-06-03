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
    const publishedDate = currentPost?.createdAt ? new Date(currentPost.createdAt).toLocaleDateString() : 'Undated';

    return (
        <div className="article-shell">
            {
                currentPost ?

                    <article className="pb-12">
                        <header className="mx-auto max-w-4xl border-b border-stone-900/70 pb-8 text-center">
                            <div className="mb-5 flex items-center justify-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-stone-500">
                                <span>Article</span>
                                <span className="h-px w-8 bg-stone-400" aria-hidden="true"></span>
                                <time dateTime={currentPost.createdAt}>{publishedDate}</time>
                            </div>
                            <h2 className="article-title mx-auto max-w-4xl text-5xl leading-none text-stone-950 md:text-7xl">
                                {currentPost.title}
                            </h2>
                        </header>

                        <figure className="mx-auto mt-8 max-w-5xl border-y border-stone-900/70 py-4">
                            <img src={`${import.meta.env.VITE_API_URL}/uploads/${currentPost.image}`} alt={currentPost.title}
                                 className="block h-[22rem] w-full object-cover grayscale md:h-[34rem]"/>
                        </figure>

                        <div className="article-body mx-auto mt-10 max-w-3xl">
                            <p className="article-lede text-2xl leading-10 text-stone-800">
                                <span className="article-dropcap">{first}</span>
                                <span>{rest}</span>
                            </p>
                        </div>

                        {
                            currentPost.fullContent && currentPost.fullContent.map((item, index) => {

                                    const text = item?.description.trim();
                                    const first = text?.charAt(0);
                                    const rest = text?.slice(1);

                                    return (
                                        <section key={index} className="article-section mx-auto mt-12 max-w-3xl border-t border-stone-300 pt-8">
                                            <h3 className="mb-5 text-3xl leading-tight text-stone-950 md:text-4xl">{item.title}</h3>

                                            <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`} alt={item.title}
                                                 className="mb-7 block h-80 w-full object-cover grayscale md:h-96"/>
                                            <p className="text-xl leading-9 text-stone-700">
                                                <span className="article-section-dropcap">{first}</span>
                                                <span>{rest}</span>
                                            </p>
                                        </section>
                                    )
                                }
                            )
                        }


                    </article>
                    : <p className="mx-auto max-w-3xl border-y border-stone-300 py-8 text-center text-lg uppercase tracking-[0.2em] text-stone-500">No post</p>
            }
        </div>
    )

};

export default PostByPost;
