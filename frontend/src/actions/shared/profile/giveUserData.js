const giveUserData = async (userType, token) => {
    try {
        const response = await fetch(`/api/${userType}/profile`, {
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
            const responseObject = {
                type: 'data',
                userData: data.userData,
            }
            if ('customer' !== userType) {
                responseObject.companyData = data.companyData
            }
            return (responseObject);
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { giveUserData };