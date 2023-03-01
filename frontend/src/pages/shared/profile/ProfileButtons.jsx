// this page is not used and not need
import React from 'react'

function ProfileButtons({ userType, redirectHandler }) {



    return (
        <div style={{"background-image":"linear-gradient(#b993d6, #8ca6db)"}}>

            {/* owner button */}
            {
                'owner' === userType && <>
                    <button onClick={redirectHandler} value="/show-companies">companies</button>
                    <button onClick={redirectHandler} value="/owner/show-pending-orders">pending orders</button>
                    <button onClick={redirectHandler} value="/owner/show-assigned-orders">assigned orders</button>
                    <button onClick={redirectHandler} value="/owner/show-in-query-orders">Worker Order Query</button>
                    <button onClick={redirectHandler} value="/owner/show-worker-applications">worker application</button>
                    <button onClick={redirectHandler} value="/owner/get-payment-details">payment details</button>
                </>
            }

            {/* customer */}
            {
                'customer' === userType &&
                <>
                    <button onClick={redirectHandler} value="/show-companies">Show companies</button>
                    <button onClick={redirectHandler} value="/customer/show-placed-orders">My orders</button>
                    <button onClick={redirectHandler} value="/customer/get-payment-details">get payment details</button>
                    <button onClick={redirectHandler} value="/customer/get-subscription-details">My Plans</button>
                </>
            }

            {/* worker */}
            {
                'worker' === userType && <>
                    <button onClick={redirectHandler} value="/worker/orders/assigned">show assigned orders</button>
                    <button onClick={redirectHandler} value="/worker/orders/delievered">show delievered Orders</button>
                </>
            }
        </div>
    )
}

export default ProfileButtons