const acceptPayment = async (token, payment_id) => {
    console.log(token, '      ', payment_id)
    try {
        const response = await fetch('/api/owner/accept-payment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ paymet_id: payment_id })
        });
        const data = await response.json();
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'data',
                message: 'done'
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { acceptPayment };