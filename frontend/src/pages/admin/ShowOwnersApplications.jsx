import React, { useContext, useEffect, useState } from 'react'
import Layout from '../shared/Layout/Layout'
import { giveAdminRelatedData } from '../../actions/admin/giveAdminRelatedData';
import MultiToast from '../../actions/shared/MultiToast';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../../context/CookiesProvider';
import { acceptApplication } from '../../actions/admin/acceptApplication';
import UserDetails from './ShowUsers/UserDetails';

function ShowOwnersApplications() {
    const { cookies } = useContext(CookiesContext);
    const [loading, setLoading] = useState(false);
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            setLoading(true);
            const response = await giveAdminRelatedData(token, 'get-owners-applications');
            if (false === response.authenticated) {
                MultiToast(response.message, true);
                navigate('/admin/login');
            }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickHandler = async (e) => {
        e.preventDefault();
        const { token } = cookies;
        const response = await acceptApplication(token, e.target.value);
        if (false === response.authenticated) {
            navigate('/adminpage');
        }
        if ('error' === response.type) {
            MultiToast(response.error, true);
            navigate('/');
        } else {
            console.log(response.owners);
            setOwners(response.owners);
        }
        console.log(response.owners);
        setLoading(false);
    }

    if (true === loading) {
        return <Spinner />
    }
    return (
        <>
            <Layout userType={'admin'}>
                {loading ? <Spinner /> :
                    <div>
                        {
                            owners.map((owner, index) => (
                                <div key={index}>
                                    <UserDetails user={owner.ownerData} companyData={owner.companyData} userType='owner' key={index} />
                                    <button value={owner.ownerData._id} onClick={onClickHandler}>accept</button>
                                </div>
                            ))
                        }
                    </div>
                }
            </Layout>
        </>
    )
}

export default ShowOwnersApplications