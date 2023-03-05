import React, { useContext, useState } from 'react'
import MultiToast from '../actions/shared/MultiToast';
import { loginUser } from '../actions/guestUser/loginUser';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../context/CookiesProvider';

export default function Temp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setCookies } = useContext(CookiesContext);

    const handleClick = async (e) => {
        e.preventDefault();
        const user = {
            collectionName: 'Admin',
            email: email,
            password: password,
        };
        const response = await loginUser(user);
        console.log(response);
        if ("error" === response.type) {
            console.log(response.error);
            MultiToast(response.error, true);
        } else {
            setCookies("token", response.token);
            console.log(response.token);
            MultiToast("successfully logged in", false);

            navigate(`/adminPage`);
        }
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        if ('email' === e.target.name) setEmail(e.target.value);
        if ('password' === e.target.name) setPassword(e.target.value);
    }

    return (
        <>
            <input type="text" name="email" onChange={onChangeHandler} />
            <input type="password" name="password" onChange={onChangeHandler} />
            <button onClick={handleClick}>Login</button>
        </>
    )
}
