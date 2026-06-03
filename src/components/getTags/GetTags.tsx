import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchTags} from "../../features/tagSlice/tagSlice.ts";
import {Link} from "react-router-dom";

const GetTags = () => {

const {tags, status} = useSelector((state:RootState)=> state.tags);

const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle')
        dispatch(fetchTags())
    }, [dispatch, status]);


    return (
        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-stone-300 py-3">
            {tags.length ? (
                tags.map((tag) => (
                    <Link
                        key={tag.id}
                        to={`/tag/${tag.name}`}
                        className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 transition hover:text-red-800"
                    >
                        #{tag.name}
                    </Link>
                ))
            ) : (
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">no tags</p>
            )}
        </div>
    );
};

export default GetTags;
