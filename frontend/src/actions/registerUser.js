const registerUser = async (user) => {
    try {
        const response = await fetch(`http://localhost:3001/api/customer/register`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if ('error' === data.type)
            throw new Error(data.message);
        else {
            return {
                type: 'data',
                token: data.token
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { registerUser };