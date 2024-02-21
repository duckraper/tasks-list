import { Navigate, Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import AuthContext from "../contexts/AuthContext"
import { useContext } from "react";

const PrivateRoute = () => {
    let user = useContext(AuthContext)

    return user ? (
        <div>
            <Navigation />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute