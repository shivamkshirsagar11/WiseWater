import React, { useContext, useEffect } from 'react';
import { CookiesContext } from './context/CookiesProvider';
import { authenticateUser } from './actions/shared/authenticateUser';
import { DataContext } from './context/DataProvider';
import { giveUserType } from './actions/guestUser/giveUserType';
import MultiToast from './actions/shared/MultiToast';
import { useNavigate } from 'react-router-dom';

function LoginChecker({ children }) {
    const { cookies } = useContext(CookiesContext);
    const { state, dispatch } = useContext(DataContext);
    const { token } = cookies;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserType = async () => {
            if (token) {
                const response = await giveUserType(token);
                console.log(response);
                if ("error" === response.type) {
                    MultiToast(response.error, true);
                    return;
                }
                const userType = response.userType;
                navigate(`/${userType}/profile`);
                console.log(response.userType);
            }
        }
        fetchUserType();
    }, [token])

    console.log(token);
    if (undefined === token) {
        return (
            <>{children}</>
        )
    } else {

    }
}

export default LoginChecker