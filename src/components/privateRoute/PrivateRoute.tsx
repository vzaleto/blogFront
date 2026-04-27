import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const {isAuth} = useSelector((state: RootState) => state.auth);


    if(!isAuth){
        return <div>треба логин</div>;
    }

    return children
}
export default PrivateRoute