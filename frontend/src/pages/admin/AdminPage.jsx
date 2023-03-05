import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminPage() {

    const navigate = useNavigate();

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    };

    return (
        <div>
            <button onClick={redirectHandler} value='/admin/show-customers'>show customers</button>
        </div>
    )
}

export default AdminPage