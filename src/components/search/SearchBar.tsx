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
        <form onSubmit={handleSearch} >
            <input type="text" value={searchQuery} placeholder="search" onChange={(e)=>setSearchQuery(e.target.value) } />
            <button type='submit' > search </button>
        </form>
    );
};

export default SearchBar;