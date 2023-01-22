const deliverOrder = async (token,order_id) => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/worker/order-delivered`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token,order_id }),
            }
        );
        const data = await response.json();
        if ('error' === data.type)
            throw new Error(data.message);
        else {
            return {
                type: 'data',
                assignedOrders: data.assignedOrders
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