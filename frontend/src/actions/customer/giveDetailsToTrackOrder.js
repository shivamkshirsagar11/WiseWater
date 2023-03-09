const giveDetailsToTrackOrder = async (token, orderId) => {
    try {
        console.log(orderId);
        const response = await fetch(
            `/api/customer/track-order`,
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
                message: "Authentication failed",
            }
        }
        const data = await response.json();
        if (undefined !== data.error) {
            console.log(data.error);
            throw data.error.errorMessage;
        }
        else {
            return {
                type: 'data',
                order: data.order,
                worker: data.worker
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }
}

export { giveDetailsToTrackOrder };