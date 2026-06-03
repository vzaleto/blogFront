import {FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchPostsSearch} from "../../features/postSlise/postSlice.ts";
import {AppDispatch} from "../../store/store.ts";


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const dispatch:AppDispatch = useDispatch();
    // const navigate = useNavigate()


    const handleSearch = async (e: FormEvent) => {
        e.preventDefault()
        // navigate(`/post/search/?query=${searchQuery}`);
        await dispatch(fetchPostsSearch(searchQuery))
    }

    return (
        <form onSubmit={handleSearch} className="flex border border-stone-900 bg-[#f7f6f2]">
            <input
                type="text"
                value={searchQuery}
                placeholder="Search..."
                onChange={(e)=>setSearchQuery(e.target.value)}
                className="min-w-0 bg-transparent px-3 py-2 text-sm uppercase tracking-[0.12em] text-stone-950 placeholder:text-stone-500 focus:outline-none"
            />
            <button type='submit' className="border-l border-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-950 hover:text-[#f7f6f2]">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
