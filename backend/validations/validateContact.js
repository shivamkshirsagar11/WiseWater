// import fetch from "node-fetch";
import fetch from "node-fetch";
export async function validateContact(contact) {
  const url = `https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp?number=%2B91${contact}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "545dbf7d78mshff7123645d30734p10b70fjsn875e2cf4fbfd",
      "X-RapidAPI-Host": "phonenumbervalidatefree.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const { isPossibleNumber, isValidNumber } = data;
  if (isValidNumber && isPossibleNumber) {
    return {
      isValidNumber: true,
    };
  } else {
    return {
      isValidNumber: false,
    };
  }
}
