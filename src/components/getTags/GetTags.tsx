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

// const handleClick = (tagName: string) => {
//     dispatch(fetchPostsByTagName(tagName))
// }

    return (
        <div className="flex-row flex mx-auto" >
            {
                tags.length ?
                    tags.map((tag) => (
                        <div key={tag.id} className="block  before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-cyan-500 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-cyan-500 " >
                            <Link to={`/tag/${tag.name}`} className="uppercase text-gray-600 block py-2.5 px-3.5 hover:bg-cyan-500 hover:text-white transition delay-35" >{tag.name}</Link>
                        </div>
                    ))
                    :
                    <div>no tags</div>
            }
        </div>
    );
};

export default GetTags;