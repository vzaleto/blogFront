import {fetchPostDelete} from "../../features/postSlise/postSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {fetchTags} from "../../features/tagSlice/tagSlice.ts";

interface PostDeleteProps {
    elemId: number | undefined;
}

export const PostDelete: React.FC<PostDeleteProps> = ({elemId}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = async () => {
        if (elemId) {
            await dispatch(fetchPostDelete(Number(elemId)))
            dispatch(fetchTags())
        }
    }

    return (
        <div>
            <button type="button"
                    className="w-28 py-2 text-center rounded-3xl text-base block border-amber-700 border-2 text-red-900  hover:border-rose-400 transition"
                    onClick={handleDelete}> delete
            </button>
        </div>
    )
}