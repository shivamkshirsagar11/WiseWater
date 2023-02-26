const subscription = async (userType,urlParam, token) => {
    try {
      const response = await fetch(`/api/${userType}/${urlParam}`, {
        method: "POST",
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
  
  export { subscription };
  