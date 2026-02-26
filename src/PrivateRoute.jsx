import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    
    const { isLoggIn, isloginloading } = useSelector((state) => state.user );
    console.log(isLoggIn, isloginloading);

    if (isloginloading) return <div>Checking authentication....</div>;
    
    return isLoggIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;