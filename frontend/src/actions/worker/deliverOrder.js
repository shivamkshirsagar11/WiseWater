const deliverOrder = async (token, orderId) => {
    try {
        const response = await fetch(
            `/api/worker/order-delivered`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ orderId }),
            }
        );
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
                type: 'success'
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { deliverOrder };