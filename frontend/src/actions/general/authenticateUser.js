const authenticateUser = async (user, token) => {

    try {
        const response = await fetch(`http://localhost:3001/api/${user}/authenticate`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data.type === 'error')
            throw new Error(data.message);
        else {
            return({
                type : 'success',
            })
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }

}

export { authenticateUser }