const authenticateUser = async (user, token) => {

    try {
        const response = await fetch(`/api/${user}/authenticate`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        if (401 === response.status) {
            return {
                authenticated: false,
                message: "Authentication failed",
            }
        }
        const data = await response.json();
        if (data.type === 'error')
            throw (data.message);
        else {
            return ({
                type: 'success',
            })
        }
    } catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }

}

export { authenticateUser }