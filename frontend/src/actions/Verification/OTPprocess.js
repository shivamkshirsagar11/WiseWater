const sendOtp = async (contact) => {
    try{
        const response = await fetch(`/api/user/otp/send`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({contact})
    });
        const data = await response.json();
        return {
            type : 'data',
            status : data.status,
        }
    }catch(error){
        return {
            type : 'error',
            error : 'some thing went wrong please try again',
        }
    }

}
const verifyOtp = async (contact, otp) => {
    try{
        const response = await fetch(`/api/user/otp/verify`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({contact, otp})
    });
        const data = await response.json();
        return {
            type : 'data',
            status : data.status,
        }
    }catch(error){
        return {
            type : 'error',
            error : 'some thing went wrong please try again',
        }
    }

}

export { sendOtp, verifyOtp }