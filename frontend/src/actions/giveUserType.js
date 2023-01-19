const giveUserType = async(token)=>{
    const response = await fetch(`http://localhost:3001/api/user/give-user-type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();

    return data.userType;
}

export {giveUserType}