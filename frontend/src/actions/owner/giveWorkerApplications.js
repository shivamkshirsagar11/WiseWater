const giveWorkerApplications = async (token) => {
    try {
        const response = await fetch(`/api/owner/showWorkerApplications`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
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
                workerApplications: data.workerApplications,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { giveWorkerApplications };