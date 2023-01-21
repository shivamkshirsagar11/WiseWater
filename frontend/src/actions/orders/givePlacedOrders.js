const givePlacedOrders = async (token) => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/customer/show-placed-orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            }
        );
        const data = await response.json();
        if ('error' === data.type)
            throw new Error(data.message);
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