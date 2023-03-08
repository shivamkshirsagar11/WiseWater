import React, { useContext, useEffect, useState } from 'react'
import Spinner from './pages/Spinner';
import { CookiesContext } from './context/CookiesProvider';
import { authenticateUser } from './actions/shared/authenticateUser';
import MultiToast from './actions/shared/MultiToast';
import { useNavigate } from 'react-router-dom';

function ProtectedRouter({ userType, children }) {
    const [loading, setLoading] = useState(true);
    const { cookies } = useContext(CookiesContext);
    const { token } = cookies;
    const navigate = useNavigate();
    console.log('here')
    useEffect(() => {
        const fetchData = async () => {

            const response = await authenticateUser(userType, token);

            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/');
            } else
                setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return <>{children}</>
    }

}

export default ProtectedRouter