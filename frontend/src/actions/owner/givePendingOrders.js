const givePendingOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/owner/show-pending-orders`,
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
                message:"Authentication failed",
            }
        }
        const data = await response.json();
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'data',
                pendingOrderList: data.pendingOrderList
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }
}

export { givePendingOrders };