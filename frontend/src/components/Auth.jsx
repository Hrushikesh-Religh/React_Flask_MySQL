import { Outlet, Navigate } from 'react-router-dom'

const Auth = () => {
    let auth = true;
    return(
        auth ? <Outlet /> : <Navigate to = "/" />
    )
}
export default Auth