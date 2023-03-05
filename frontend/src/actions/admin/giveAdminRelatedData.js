const giveAdminRelatedData = async (token, url) => {
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        };
        const response = await fetch(`/api/admin/${url}`, options);
        const data = await response.json();
        if (undefined !== data.error) throw data.error.errorMessage;
        else {
            if ('get-customers' === url)
                return {
                    type: "data",
                    customers: data.customers
                };
            else
                return {
                    type: 'data',
                    owners: data.owners
                }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveAdminRelatedData }


