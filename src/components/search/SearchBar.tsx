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
        <form onSubmit={handleSearch} className="flex rounded-3xl border border-black">
            <input
                type="text"
                value={searchQuery}
                placeholder="Search..."
                onChange={(e)=>setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-l-3xl border-none border-gray-300 focus:outline-none text-base placeholder:text-gray-400 text-black"
            />
            <button type='submit' className="px-4 py-2 bg-black text-white  rounded-r-3xl hover:bg-stone-700 transition border-none text-base">
                Search
            </button>
        </form>
    );
};

export default SearchBar;