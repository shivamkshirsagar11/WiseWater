const giveUserData = async (userType, token) => {
    try {
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
            const responseObject = {
                type : 'success',
                userData : data.userData,
            }
            if( 'customer'!==userType ){
                responseObject.companyData = data.companyData
            }
            return (responseObject);
        }
    } catch (error) {
        return ({
            type: 'error',
            data: error
        })
    }
}

export { giveUserData };