const giveWorkerDelieveredOrders = async (token) => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/worker/show-delievered-orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        if ('error' === data.type)
            throw new Error(data.message);
        else {
            return {
                type: 'data',
                delieveredOrders: data.delieveredOrders
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveWorkerDelieveredOrders };