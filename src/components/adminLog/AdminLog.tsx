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
        <form onSubmit={handleSubmit} className="flex gap-2 items-center" >

                <input type='text' value={username}  placeholder="login" onChange={ (e)=> setUsername(e.target.value)}  className="px-3 py-1 rounded border"/>

            <label>
                <input type='text' value={password} placeholder="password" onChange={ (e)=> setPassword(e.target.value)} className="px-3 py-1 rounded border"/>
            </label>
                <button type='submit' className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">Login </button>
            {status === 'failed' && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </form>
    );
};

export default AdminLog;