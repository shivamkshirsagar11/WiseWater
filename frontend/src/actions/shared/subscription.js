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
      const data = await response.json();
      if (undefined !== data.error) throw data.error.errorMessage;
      else {
        return {
          type: "data",
          plans:data.plans
        };
      }
    } catch (error) {
      return {
        type: "error",
        error,
      };
    }
  };
  
  export { getAllSubscription };
  