import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchPosts, fetchPostsSearch, resetPosts, setFiltered} from "../../features/postSlise/postSlice.ts";
import GetTags from "../getTags/GetTags.tsx";
import PostCard from "../postCard/PostCard.tsx";
import {useSearchParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import {Tag} from "../../Types/types.ts";
import {PostDelete} from "../postDelete/PostDelete.tsx";
import {ButtonEdit} from "../ButtonEdit/ButtonEdit.tsx";

const PostsGetAll = () => {

    const {posts} = useSelector((state: RootState) => state.posts);
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('query')?.trim() || '';
    const currentMonth = new Intl.DateTimeFormat('en', {month: 'long'}).format(new Date());
    const leadPost = posts?.[0];
    const secondaryPosts = posts?.slice(1, 3) || [];
    const listPosts = posts?.slice(3) || [];
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    useEffect(() => {

        if (!searchQuery) {

            dispatch(resetPosts())
            dispatch(fetchPosts())
            dispatch(setFiltered(false))
        } else {
            dispatch(fetchPostsSearch(searchQuery))
        }

    }, [dispatch, searchQuery]);


    return (
        <div className="posts-list">
            <GetTags/>
            {
                leadPost ? (
                    <>
                        <section className="front-page-lead" aria-label="Lead story">
                            <Link to={`/post/${leadPost.id}`} className="front-page-lead-image">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${leadPost.image}`}
                                    alt={leadPost.title}
                                />
                            </Link>

                            <div className="front-page-lead-copy">
                                <div className="front-page-label">
                                    <span>Lead Story</span>
                                    <span aria-hidden="true">/</span>
                                    <span>{currentMonth}</span>
                                </div>

                                <h2 className="front-page-lead-title">
                                    <Link to={`/post/${leadPost.id}`} className="magazine-title-link">
                                        {leadPost.title}
                                    </Link>
                                </h2>

                                <p className="front-page-lead-excerpt">
                                    {leadPost.content}
                                </p>

                                <div className="front-page-lead-footer">
                                    <div className="front-page-lead-tags">
                                        {
                                            leadPost.tags && leadPost.tags.length ?
                                                leadPost.tags.map((tag: Tag) => (
                                                    <span key={tag.id}>{tag.name}</span>
                                                )) : <span>No tags</span>
                                        }
                                    </div>
                                    <div className="flex flex-col gap-3 sm:items-end">
                                        <Link to={`/post/${leadPost.id}`}
                                              className="magazine-read-link front-page-read-link">
                                            Read lead story
                                        </Link>
                                        {
                                            isAuth && leadPost.id ? (
                                                <div className="flex flex-wrap gap-2">
                                                    <PostDelete elemId={leadPost.id}/>
                                                    <ButtonEdit id={leadPost.id}/>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                        {
                            secondaryPosts.length ? (
                                <section className="front-page-secondary max-w-5xl mx-auto"
                                         aria-label="Secondary stories">
                                    {secondaryPosts.map((elem) => (
                                        <PostCard key={elem.id} elem={elem} variant="teaser"/>
                                    ))}
                                </section>
                            ) : null
                        }

                        {
                            listPosts.map((elem) => (
                                <PostCard key={elem.id} elem={elem}/>
                            ))
                        }
                    </>
                ) : <p>"no posts"</p>
            }
        </div>
    );
};

export default PostsGetAll;
