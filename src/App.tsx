
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store.ts";
import {setAuthTokenFromStorage} from "./features/adminSlice/adminSlice.ts";

const App = () => {
const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(setAuthTokenFromStorage())
    }, []);

    return (
        <div>
           <Outlet/>
        </div>
    );
};

export default App;