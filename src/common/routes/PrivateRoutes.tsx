import { Navigate, Outlet } from 'react-router-dom'
import {useAppSelector} from "../../bll/store";

export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    return (
        isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
    )
}