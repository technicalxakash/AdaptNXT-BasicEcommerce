import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { isLoggedIn, role: userRole } = useAuth();

    if (!isLoggedIn) return <Navigate to="/login" />;
    if (role && userRole !== role) return <Navigate to="/unauthorized" />;

    return children;
};

export default PrivateRoute;