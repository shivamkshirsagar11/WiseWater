import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserDetails from '../shared/details/UserDetails.jsx';
import MultiToast from '../../actions/shared/MultiToast.js';
import { CookiesContext } from '../../context/CookiesProvider.js';

export default function ResolveInQueryOrder() {

    const { cookies } = useContext(CookiesContext);
    const { customer_id } = useParams();
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
                    body: JSON.stringify({ token, customer_id })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <UserDetails userData={customer} />
        </div>
    )
}
