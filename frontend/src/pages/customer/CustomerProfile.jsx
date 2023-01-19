// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Spinner from '../../components/Spinner';
// import ShowCustomerDetails from '../../components/UserDetails';

// // NOTE :- I AM NOT SURE WHATHER WE SHOULD PUT NAVIGATE INSIDE useEffect dependenicy or not

// import { giveUserData } from '../../actions/giveUserData';

// export default function CustomerProfile({ cookies, removeCookies }) {
//     const navigate = useNavigate();

//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchData = async()=> {
//             const {token} = cookies;
//             const response = await giveUserData('customer',token);
//             if( 'error'===response.type ){
//                 alert(response.data);
//                 navigate('/');
//             }else{
//                 setUserData(response.userData);
//             }
//         }
//         fetchData();
//     }, [cookies]);

//     if (userData === null) {
//         return <Spinner />
//     }

//     const handleLogout = (e) => {
//         e.preventDefault();
//         removeCookies('token');
//         navigate('/');
//     }

//     const redirectHandler = (e) => {
//         e.preventDefault();
//         navigate(`${e.target.value}`);
//     }

//     return (
//         <>
//             <div>
//                 <ShowCustomerDetails userData={userData} />
//             </div>
//             <button onClick={redirectHandler} value="/show-companies">Show companies</button>
//             <button onClick={redirectHandler} value="/customer/show-placed-orders">My orders</button>
//             <button onClick={handleLogout}>logout</button>
//         </>
//     );
// }
