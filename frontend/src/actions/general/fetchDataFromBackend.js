const fetchDataFromBackend = async(url,data)=>{
    const {token} = data;
    delete data.token;
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...data }),
        });
        
        const dataJson = await response.json();
        if (dataJson.type === 'error')
            throw new Error(dataJson.message);
        else{
            return({
                type :'data',
                data : dataJson
            })
        }
    }catch(error){
        return({
            type : 'error',
            error
        })
    }
}

export {fetchDataFromBackend};