import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../../actions/general/registerUser';
import UserDetailsForRegister from './UserDetailsForRegister';
import CompanyDetailsForRegister from './CompanyDetailsForRegister';

export default function OwnerRegistration({ setCookies }) {
    const navigate = useNavigate();

    const [userDataForm, setUserDataForm] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', contact: ''
    });

    const [companyData, setCompanyData] = useState({
        name: '', email: '', contact: '', serviceTime: '',
        address: { line1: '', line2: '', city: '', pincode: '', state: '' }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = { userData: { ...userDataForm }, companyData: { ...companyData } };

        console.log(owner);

        const response = await registerUser('owner', owner);
        if ('error' === response.type) {
            alert(response.error);
        } else {
            setCookies('token', response.token);
            alert('you are registered successfully');
            navigate('/owner/profile');
        }

    }
    return (
        <div>
            <form method="post" >
                <UserDetailsForRegister userData={userDataForm} setUserDataForm={setUserDataForm} />

                {/* company */}
                <CompanyDetailsForRegister companyData={companyData} setCompanyData={setCompanyData} />

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
