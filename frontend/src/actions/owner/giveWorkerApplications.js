const giveWorkerApplications = async (token) => {
    try {
        const response = await fetch(`http://localhost:3001/api/owner/showWorkerApplications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data.type === 'error')
            throw new Error(data.message);
        else {
            return {
                type : 'data',
                workerApplications : data.workerApplications,
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