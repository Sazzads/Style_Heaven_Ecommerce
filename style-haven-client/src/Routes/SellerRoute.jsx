
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Pages/Shared/Spinner';
import useAuth from '../hooks/useAuth';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    const [isSeller, isSellerLoading] = useSeller()
    if (loading || isSellerLoading) {
        return <Spinner></Spinner>
    }
    if (user && isSeller) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerRoute;