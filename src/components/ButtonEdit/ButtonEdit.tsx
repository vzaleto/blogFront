
import {useNavigate} from "react-router-dom";

export const ButtonEdit = ({id}: {id: number})=>{

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/postEdit/${id}`)
    }
    return (
        <button
            type="button"
            className="border border-stone-900 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-950 hover:text-[#f7f6f2] focus:outline-none focus:ring-1 focus:ring-stone-950"
            onClick={handleClick}
        >
            Edit
        </button>
    )
}
