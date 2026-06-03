import {FC} from 'react';
import {Post, Tag} from "../../Types/types";
import {Link} from "react-router-dom";
import {PostDelete} from "../postDelete/PostDelete.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {ButtonEdit} from "../ButtonEdit/ButtonEdit.tsx";

 export interface PostCardProps {
    elem: Post;
    featured?: boolean;
}

const PostCard: FC<PostCardProps> = ({elem, featured = false}) => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const publishedDate = elem.createdAt ? new Date(elem.createdAt).toLocaleDateString() : 'Undated';
    const readingTime = `${Math.max(1, Math.ceil((elem.content || '').split(/\s+/).length / 180))} min read`;

    return (
        <article
            key={elem.id}
            className={`card magazine-card group relative border-y border-stone-900/70 py-7 transition duration-300 hover:border-stone-950 ${
                featured ? 'featured-card md:py-10' : ''
            }`}
        >
            <div className={`grid gap-6 md:items-stretch ${featured ? 'md:grid-cols-[1.05fr_1fr]' : 'md:grid-cols-[40%_1fr]'}`}>
                <Link to={`/post/${elem.id}`} className="block overflow-hidden bg-stone-200">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${elem.image}`}
                        alt={elem.title}
                        className={`w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 ${
                            featured ? 'h-72 md:h-[27rem]' : 'h-56 md:h-72'
                        }`}
                    />
                </Link>

                <div className="flex min-w-0 flex-col justify-between border-stone-300 md:border-l md:pl-7">
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-stone-500">
                            <span>Story</span>
                            <span className="h-px w-6 bg-stone-400" aria-hidden="true"></span>
                            <time dateTime={elem.createdAt}>{publishedDate}</time>
                            <span>{readingTime}</span>
                        </div>

                        <h2
                            className={`magazine-card-title max-w-3xl leading-tight text-stone-950 ${
                                featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
                            }`}
                        >
                            <Link to={`/post/${elem.id}`} className="magazine-title-link">
                                {elem.title}
                            </Link>
                        </h2>

                        <p
                            className={`mt-5 max-w-2xl text-stone-700 ${
                                featured ? 'line-clamp-5 text-xl leading-8' : 'line-clamp-4 text-lg leading-7'
                            }`}
                        >
                            {elem.content}
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-stone-500">
                            {
                                elem.tags && elem.tags.length ?
                                    elem.tags.map((tag: Tag) => (
                                        <span key={tag.id}>{tag.name}</span>
                                    )) : <span>No tags</span>
                            }
                        </div>

                        <div className="flex flex-col gap-3 sm:items-end">
                            <Link
                                to={`/post/${elem.id}`}
                                type="button"
                                className="magazine-read-link inline-flex w-max text-sm font-bold uppercase tracking-[0.2em] text-stone-950 transition"
                            >
                                Read story
                            </Link>

                            {
                                isAuth && elem.id ? (
                                    <div className="flex flex-wrap gap-2">
                                        <PostDelete elemId={elem.id}/>
                                        <ButtonEdit id={elem.id}/>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
        ;
};

export default PostCard;
