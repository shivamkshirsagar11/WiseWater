const giveUserType = async (token) => {

    try {
        const response = await fetch(`http://localhost:3001/api/user/give-user-type`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return {
            type : 'data',
            userType : data.userType,
        }
    } catch (error) {
        return ({
            type: 'error',
            error : 'some thing went wrong please try again',
        })
    }


}

export { giveUserType }