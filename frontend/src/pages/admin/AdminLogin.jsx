import React, { useContext, useState } from 'react'
import MultiToast from '../../actions/shared/MultiToast';
import { loginUser } from '../../actions/guestUser/loginUser';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../../context/CookiesProvider';

export default function AdminLogin() {

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
            navigate(`/admin/show-customers`);
        }
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        if ('email' === e.target.name) setEmail(e.target.value);
        if ('password' === e.target.name) setPassword(e.target.value);
    }

    return (
        <>
            {/* <input type="text" name="email" onChange={onChangeHandler} />
            <input type="password" name="password" onChange={onChangeHandler} />
            <button onClick={handleClick}>Login</button> */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Hey!! Admin</h3 >
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email" style={{ fontSize: "1.2em" }}>Email:</label>
                                        <input type="email" onChange={onChangeHandler} className="form-control" id="email" name="email" required />
                                    </div>
                                    <div className="form-group" >
                                        <label htmlFor="password" style={{ fontSize: "1.2em" }}>Password:</label>
                                        <input type="password" onChange={onChangeHandler} className="form-control" id="password" name="password" required />
                                    </div >
                                    <div className="text-center" >
                                        <button type="submit" onClick={handleClick} className="btn btn-primary btn-block" style={{ backgroundColor: "#0077be" }
                                        }> Login</button >
                                    </div >
                                </form >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}
