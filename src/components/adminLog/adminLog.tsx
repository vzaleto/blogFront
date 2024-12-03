import {FormEvent, useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {adminLoginPassword} from "../../features/adminSlice/adminSlice.ts";

const AdminLog = () => {

    const {token, status, error} = useSelector((state:RootState)=>state.auth)
    const [username, setUsername] = useState<string> ('');
    const [password, setPassword] = useState<string>('');
    const dispatch:AppDispatch = useDispatch();

   const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate('/postCreate')
        }
    }, [token, navigate]);

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        await dispatch(adminLoginPassword({username, password}));
        setUsername('');
        setPassword("");

    }

console.log(token);
    return (
        <form onSubmit={handleSubmit} >
            <label>
                <input type='text' value={username} onChange={ (e)=> setUsername(e.target.value)}/>
            </label>
            <label>
                <input type='text' value={password} onChange={ (e)=> setPassword(e.target.value)}/>
            </label>
                <button type='submit'>submit </button>
            {status === 'failed' && <p>{error}</p>}
        </form>
    );
};

export default AdminLog;