const registerUser = async (userType, userObj, onlyValidation) => {
  userObj.onlyValidation = onlyValidation;
  try {
    const response = await fetch(`/api/${userType}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const data = await response.json();
    console.log(data);
    if (undefined !== data.error) throw data.error.errorMessage;
    else if (onlyValidation) {
      return {
        type: "data",
      };
    } else {
      return {
        type: "data",
        token: data.token,
      };
    }
  } catch (error) {
    return {
      type: "error",
      error:error[0]
    };
  }
};

export { registerUser };
