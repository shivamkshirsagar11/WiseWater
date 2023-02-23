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
        const data = await response.json();
        console.log(data);
        if (undefined !== data.error) {
            console.log(data.error);
            throw (data.error);
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
            error,
        })
    }
}

export { giveDetailsToTrackOrder };