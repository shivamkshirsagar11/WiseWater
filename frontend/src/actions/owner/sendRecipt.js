const sendRecipt = async (token, customer_id) => {
    console.log(token)
    console.log(customer_id)
    try {
        const response = await fetch(`/api/owner/send-recipt`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ customer_id })
        });
        if (401 === response.status) {
            return {
                authenticated: false,
                message:"Authentication failed",
            }
        }
        const data = await response.json();
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'success',
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error[0]
        })
    }
}

export { sendRecipt }