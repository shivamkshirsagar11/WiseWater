import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function WorkerApplicationFrom() {
  const navigate = useNavigate();
  const { companyname } = useParams();

  const [formData, setFormData] = useState({
    firstname: '', lastname: '', email: '', contact: '', companyname
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const worker = { ...formData };

    try {
      const response = await fetch(`http://localhost:3001/api/worker/application`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(worker)
      });
      console.log(response);
      const data = await response.json();
      if (data.type === 'error') throw new Error(data.message);
      navigate('/show-companies');
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
        contact : <input type="text" name="contact" onChange={handleInputData} value={formData.contact} />
        companyname : <input type="text" name="companyname" value={formData.companyname} readOnly={true} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
