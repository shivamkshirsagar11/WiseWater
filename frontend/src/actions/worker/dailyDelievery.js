const dailyDelievery = async (token, orderId) => {
    try {
        const response = await fetch(
            `/api/worker/deliever-daily`,
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

export { dailyDelievery };