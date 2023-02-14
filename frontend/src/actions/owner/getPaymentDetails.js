const getPaymentDetails = async (token) => {
    try {
        const response = await fetch(
            `/api/owner/payment-details`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        console.log(data);
        if (undefined !== data.error)
            throw (data.error);
        else {
            return {
                type: 'data',
                paymentList: data.paymentList,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { getPaymentDetails };