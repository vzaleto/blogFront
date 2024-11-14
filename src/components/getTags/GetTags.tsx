import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchTags} from "../../features/tagSlice/tagSlice.ts";
// import {fetchPostsByTagName} from "../../features/postSlise/postSlice.ts";

const GetTags = () => {

const {tags, status} = useSelector((state:RootState)=> state.tags);

const dispatch:AppDispatch = useDispatch();
console.log(tags)

    useEffect(() => {
        if(status === 'idle')
        dispatch(fetchTags())
    }, [dispatch, status]);

// const handleClick = (tagName: string) => {
//     dispatch(fetchPostsByTagName(tagName))
// }

    return (
        <div>
            {
                tags.length ?
                    tags.map((tag) => (
                        <div key={tag.id}>
                            <button type='button'>{tag.name}</button>
                        </div>
                    ))
                    :
                    <div>no tags</div>
            }
        </div>
    );
};

export default GetTags;