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
        <div className="flex flex-wrap gap-2 mb-6">
            {tags.length ? (
                tags.map((tag) => (
                    <Link
                        key={tag.id}
                        to={`/tag/${tag.name}`}
                        className="px-3 py-1 text-sm rounded-full border border-gray-300 hover:bg-cyan-500 hover:text-white transition"
                    >
                        #{tag.name}
                    </Link>
                ))
            ) : (
                <p>no tags</p>
            )}
        </div>
    );
};

export default GetTags;