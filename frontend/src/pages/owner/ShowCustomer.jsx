import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner.jsx';
import UserDetails from '../shared/details/UserDetails.jsx';
import MultiToast from '../../actions/shared/MultiToast.js';

export default function ResolveInQueryOrder({ cookies }) {
    const {customer_id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const { token } = cookies;
    useEffect(() => {

        const fetchCustomer = async () => {
            try {
                const response = await fetch('/api/owner/fetch-customer', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token,customer_id })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') toast.error(data.message);
                setCustomer(data.customer);
            } catch (error) {
                MultiToast('you are not authenticated' + error, true)
                navigate('/login');
            }
        }
        fetchCustomer(customer_id);
    }, []);

    if (null === customer) {
        return <Spinner />;
    }

    return (
        <div>
            <UserDetails userData={customer}/>
        </div>
    )
}