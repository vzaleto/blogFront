import {FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchPostsSearch} from "../../features/postSlise/postSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {

    const [search, setSearch] = useState('')
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate()


    const handleSearch = async (e: FormEvent) => {
        e.preventDefault()
            await dispatch(fetchPostsSearch(search))
            navigate(`/post/search?query=${search}`)
    }



    return (
        <form onSubmit={handleSearch} >
            <input type="text" value={search} placeholder="search" onChange={(e)=>setSearch(e.target.value) } />
            <button type='submit' > search </button>
        </form>
    );
};

export default SearchBar;