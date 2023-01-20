const registerUser = async (userType,userObj) => {
    try {
        var action = "register";
        if( 'worker'===userType )
            action = 'application';
        const response = await fetch(`http://localhost:3001/api/${userType}/${action}`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });
        const data = await response.json();
        console.log(data);
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