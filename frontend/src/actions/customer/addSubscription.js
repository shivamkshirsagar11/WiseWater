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
          added:true
        };
      }
    }catch (error) {
        return ({
            type: 'error',
            error:error[0]
        })
    }
}
 export {addSubscription};