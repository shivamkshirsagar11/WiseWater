const giveWorkerDelieveredOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/worker/show-delievered-orders`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        if (401 === response.status) {
            return {
                authenticated: false,
                message: "Authentication failed",
            }
        }
        const data = await response.json();
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'data',
                delieveredOrders: data.delieveredOrders
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }
}

export { giveWorkerDelieveredOrders };