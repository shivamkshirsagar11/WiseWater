const giveWorkerAssignedOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/worker/show-assigned-orders`,
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

export { giveWorkerAssignedOrders };