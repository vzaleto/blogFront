import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const CreateBtn = () => {
 const {isAuth} = useSelector((state: RootState) => state.auth)
    return(
        <div>
            {isAuth && (
                <Link to={`/postCreate`} className="block w-28 border border-stone-900 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-950 hover:text-[#f7f6f2]">Create</Link>
            )}
        </div>
    )
}
