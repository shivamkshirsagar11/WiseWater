const hireWorker = async (token, workerApplication) => {
    try {

        const response = await fetch(`/api/owner/hire-worker`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ workerApplication }),
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
                type : 'success'
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }
}

export { hireWorker };