const acceptApplication = async (token, ownerId) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ownerId: ownerId })
        };
        const response = await fetch(`/api/admin/accept-application`, options);
        if (401 === response.status) {
            return {
                authenticated: false,
                message: "Authentication failed",
            };
        }
        const data = await response.json();
        if (undefined !== data.error) throw data.error.errorMessage;
        else {
            return {
                type: "data",
                owners: data.owners
            };
        }
    } catch (error) {
        return {
            type: "error",
            error:error[0]
        };
    }
};

export { acceptApplication };
