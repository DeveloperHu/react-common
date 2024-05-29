import { Navigate } from "react-router-dom";

export const RouterAuth = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        //不能访问系统页面
        return <Navigate to='/login' replace/>
    }
    return children
}