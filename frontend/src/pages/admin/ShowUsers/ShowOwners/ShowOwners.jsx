import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../../shared/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import UserDetails from '../UserDetails';
import { giveAdminRelatedData } from '../../../../actions/admin/giveAdminRelatedData';
import Spinner from '../../../Spinner';
import { CookiesContext } from '../../../../context/CookiesProvider';
import MultiToast from '../../../../actions/shared/MultiToast';

function ShowOwners() {
    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            setLoading(true);
            const response = await giveAdminRelatedData(token, 'get-owners');
            if ('error' === response.type) {
                MultiToast(response.error, true);
                navigate('/');
            } else {
                console.log(response.owners);
                setOwners(response.owners);
            }
            setLoading(false);
        }
        fetchData();
    }, [])

    if (true === loading) {
        return <Spinner />
    }

    return (
        <Layout userType={'admin'}>
            <div>
                {
                    owners.map((owner, index) => (
                        <UserDetails user={owner.ownerData} companyData={owner.companyData} userType='owner' key={index} />
                    ))
                }
            </div>
        </Layout>
    );
}

export default ShowOwners