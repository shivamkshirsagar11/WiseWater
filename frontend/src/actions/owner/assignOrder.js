const assignOrder = async ({ token, worker_id, orderId }) => {
    try {
        const response = await fetch(`/api/owner/assign-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ worker_id, orderId })
        });
        const data = await response.json();
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'data',
                workers: data.workers,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { assignOrder }