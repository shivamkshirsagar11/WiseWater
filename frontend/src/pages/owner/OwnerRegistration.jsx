import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../actions/general/registerUser';

// { firstname, lastname, email, password, confirmPassword , contact, cName, cEmail,cContact,cAddress, cServiceTime }

export default function OwnerRegistration({setCookies}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '',  contact: '',cName : '', cEmail : '',cContact : '', cServiceTime : ''
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const [formAddress,setFormAddress] = useState({
        line1 : '',line2 : '',city:'',pincode:'',state:''
    });

    const handleInputAddress = (e)=>{
        const {name,value} = e.target;
        setFormAddress(prevState=>({...prevState,[name]:value}));
    }

    const { firstname, lastname, email, password, confirmPassword, contact, cName, cEmail,cContact, cServiceTime } = formData;
    const address = {...formAddress};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = { firstname, lastname, email, password, confirmPassword, contact, cName, cEmail,cContact, cServiceTime,address };

        const response = await registerUser('owner',owner);
        if( 'error'===response.type ){
            alert(response.error);
        }else{
            setCookies('token', response.token);
            alert('you are registered successfully');
            navigate('/owner/profile');
        }

    }
    return (
        <div>
            <form method="post" >
                firstName : <input type="text" name="firstname" onChange={handleInputData} value={firstname} />
                lastName : <input type="text" name="lastname" onChange={handleInputData} value={lastname} />
                email : <input type="email" name="email" onChange={handleInputData} value={email} />
                password : <input type="password" name="password" onChange={handleInputData} value={password} />
                confirm password : <input type="password" name="confirmPassword" onChange={handleInputData} value={confirmPassword} />
                contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />
                company name : <input type="name" name="cName" onChange={handleInputData} value={cName} />
                company email : <input type="email" name="cEmail" onChange={handleInputData} value={cEmail} />
                company contact : <input type="email" name="cContact" onChange={handleInputData} value={cContact} />
                company service time : <input type="text" name="cServiceTime" onChange={handleInputData} value={cServiceTime} />
                
                {/* address */}
                Line1 : <input type="text" name="line1" onChange={handleInputAddress} value={formAddress.line1}/>
                Line2 : <input type="text" name="line2" onChange={handleInputAddress} value={formAddress.line2}/>
                city : <input type="text" name="city" onChange={handleInputAddress} value={formAddress.city}/>
                pincode : <input type="text" name="pincode" onChange={handleInputAddress} value={formAddress.pincode}/>
                state : <input type="text" name="state" onChange={handleInputAddress} value={formAddress.state}/>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
