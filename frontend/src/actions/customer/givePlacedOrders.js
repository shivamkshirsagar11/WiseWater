const givePlacedOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/customer/show-placed-orders`,
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
        if ('error' === data.type)
            throw (data.message);
        else {
            return {
                type: 'data',
                orderList: data.orderList
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { givePlacedOrders };