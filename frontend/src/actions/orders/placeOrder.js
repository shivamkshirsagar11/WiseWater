const placeOrder = async (token, order) => {
    try {
        const response = await fetch(`http://localhost:3001/api/customer/placeorder`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token,order})
        });
        const data = await response.json();
        if ('error' === data.type)
            throw new Error(data.message);
        else {
            return {
                type: 'success',
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { placeOrder };