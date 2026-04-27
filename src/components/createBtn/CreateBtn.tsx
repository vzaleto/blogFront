import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const CreateBtn = () => {
 const {isAuth} = useSelector((state: RootState) => state.auth)
    return(
        <div>
            {isAuth && (
                <Link to={`/postCreate`} className="px-3.5 py-1.5 text-base block border-amber-700 border-2 text-red-900  hover:border-rose-400 transition ">Create</Link>
            )}
        </div>
    )
}