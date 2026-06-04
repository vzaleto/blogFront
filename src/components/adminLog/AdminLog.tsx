import {FormEvent, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {adminLoginPassword, logout} from "../../features/adminSlice/adminSlice.ts";
import {useNavigate} from "react-router-dom";

const AdminLog = () => {

    const {token, status, error, isAuth} = useSelector((state: RootState) => state.auth)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(adminLoginPassword({username, password}));
        setUsername('');
        setPassword("");
    }
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    console.log("token",token);
    return (
        isAuth ? (
           <div>
               <button onClick={() => dispatch(handleLogout)} className="block w-28 border border-stone-950 bg-stone-950 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#f7f6f2] transition hover:bg-transparent hover:text-stone-950" >logout</button>
           </div>
        ):(
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 border border-stone-300 bg-white/85 p-2">

                <input type='text' value={username} placeholder="login" onChange={(e) => setUsername(e.target.value)}
                       className="w-32 border border-stone-300 bg-[#f7f6f2] px-3 py-2 text-sm uppercase tracking-[0.12em] text-stone-950 placeholder:text-stone-500 focus:border-stone-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-950"/>

                <label>
                    <input type='text' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}
                           className="w-36 border border-stone-300 bg-[#f7f6f2] px-3 py-2 text-sm uppercase tracking-[0.12em] text-stone-950 placeholder:text-stone-500 focus:border-stone-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-950"/>
                </label>
                <button type='submit' className="border border-stone-950 bg-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f7f6f2] transition hover:bg-transparent hover:text-stone-950">Login</button>
                {status === 'failed' && (
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-red-800">{error}</p>
                )}
            </form>
        )


    );
};

export default AdminLog;
