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
                    className="border border-red-800 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-800 transition hover:bg-red-800 hover:text-[#f7f6f2] focus:outline-none focus:ring-1 focus:ring-red-800"
                    onClick={handleDelete}>Delete
            </button>
        </div>
    )
}
