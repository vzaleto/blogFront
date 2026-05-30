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
                    className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-red-700 transition hover:border-red-400 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                    onClick={handleDelete}>Delete
            </button>
        </div>
    )
}
