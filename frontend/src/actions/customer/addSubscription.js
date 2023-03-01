const addSubscription = async (token, subObj)=>{
    console.log(token);
    try{
        const options ={
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({subObj:subObj})
        }
        const response = await fetch('/api/customer/add-plan', options);
        const data = await response.json();
        if (undefined !== data.error) throw data.error.errorMessage;
      else {
        return {
          type: "data",
          added:true
        };
      }
    }catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}
 export {addSubscription};