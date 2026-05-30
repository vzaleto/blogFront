
import {useNavigate} from "react-router-dom";

export const ButtonEdit = ({id}: {id: number})=>{

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/postEdit/${id}`)
    }
    return (
        <button
            type="button"
            className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-stone-800 transition hover:border-amber-700 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-200"
            onClick={handleClick}
        >
            Edit
        </button>
    )
}
