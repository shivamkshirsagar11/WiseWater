const loginUser = async (user) => {
    console.log(user)
    try {
        const response = await fetch(`/api/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
        if (undefined !== data.error)
            throw (data.error.errorMessage);
        else {
            return {
                type: 'data',
                token: data.token,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            type: 'error',
            error: error
        };
    }
}

export { loginUser };