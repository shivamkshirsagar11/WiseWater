const getAllSubscription = async (userType,urlParam, token) => {
  console.log("from get all subs")
    try {
      const response = await fetch(`/api/${userType}/${urlParam}`, {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });
      console.log("ok till")
      const data = await response.json();
      console.log("from action: ", data)
      if (401 === response.status) {
        return {
            authenticated: false,
            message:"Authentication failed",
        }
    }
      if (undefined !== data.error) throw data.error.errorMessage;
      else {
        const found = data.plans != undefined ?true:false
        return {
          type: "data",
          plans:data.plans,
          customers:data.customers,
          workers:data.workers,
          daily:data.dailyOrd,
          found
        };
      }
    } catch (error) {
      return {
        type: "error",
        error:error
      };
    }
  };
  
  export { getAllSubscription };
  