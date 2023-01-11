import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CustomerRegistration({ setCookies }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', contact: ''
    });
    const [formAddress, setFormAddress] = useState({
        line1: '', line2: '', city: '', pincode: '', state: ''
    });

    const handleInputAddress = (e) => {
        const { name, value } = e.target;
        setFormAddress(prevState => ({ ...prevState, [name]: value }));
    }

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customer = { ...formData, ...formAddress };

        try {
            const response = await fetch(`http://localhost:3001/api/customer/register`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            const data = await response.json();
            if (data.type === 'error') throw new Error(data.message);
            setCookies('token', data.token);
            navigate('/customer/profile');
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <form method="post" >
                firstName : <input type="text" name="firstname" onChange={handleInputData} value={formData.firstname} />
                lastName : <input type="text" name="lastname" onChange={handleInputData} value={formData.lastname} />
                email : <input type="email" name="email" onChange={handleInputData} value={formData.email} />
                password : <input type="password" name="password" onChange={handleInputData} value={formData.password} />
                confirm password : <input type="password" name="confirmPassword" onChange={handleInputData} value={formData.confirmPassword} />
                contact : <input type="text" name="contact" onChange={handleInputData} value={formData.contact} />

                {/* address */}
                Line1 : <input type="text" name="line1" onChange={handleInputAddress} value={formAddress.line1} />
                Line2 : <input type="text" name="line2" onChange={handleInputAddress} value={formAddress.line2} />
                city : <input type="text" name="city" onChange={handleInputAddress} value={formAddress.city} />
                pincode : <input type="text" name="pincode" onChange={handleInputAddress} value={formAddress.pincode} />
                state : <input type="text" name="state" onChange={handleInputAddress} value={formAddress.state} />

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
