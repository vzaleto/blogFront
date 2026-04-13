import {FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchPostsSearch} from "../../features/postSlise/postSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate()


    const handleSearch = async (e: FormEvent) => {
        e.preventDefault()
            await dispatch(fetchPostsSearch(searchQuery))
            navigate(`/post/search/?query=${searchQuery}`)
    }



    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                value={searchQuery}
                placeholder="Search..."
                onChange={(e)=>setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
                Search
            </button>
        </form>
    );
};

export default SearchBar;