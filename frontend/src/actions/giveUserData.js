const giveUserData = async (userType, token) => {
    try {
        console.log(userType + ' ' + token);
        const response = await fetch(`http://localhost:3001/api/${userType}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.type === 'error')
            throw (data.message);
        else {
            return ({
                type: 'success',
                data: data.user
            });
        }
    } catch (error) {
        console.log(error);
        return ({
            type: 'error',
            data: error
        })
    }
}

export { giveUserData };