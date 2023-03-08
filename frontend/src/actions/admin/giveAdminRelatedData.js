const giveAdminRelatedData = async (token, url) => {
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`/api/admin/${url}`, options);
        if (401 === response.status) {
            return {
                authenticated: false,
                message:"Authentication failed",
            }
        }

        const data = await response.json();
        if (undefined !== data.error) throw data.error.errorMessage;
        else {
            return {
                type: "data",
                ...data
            };
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveAdminRelatedData }


