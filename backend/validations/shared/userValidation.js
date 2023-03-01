import pkg from "validator";
const { isStrongPassword, isEmail } = pkg;
import { validateContact } from "../validateContact.js";
import fetch from "node-fetch";

export async function userValidation(userData) {
  const {
    firstname,
    email,
    password,
    confirmPassword,
    lastname,
    contact,
  } = userData;
  const error = [];
  if (!firstname) {
    error.push("Firstname is required");
  }
  if (!lastname) {
    error.push("Lastname is required");
  }
  if (!password) {
    error.push("Password is required");
  }
  if (password && !isStrongPassword(password)) {
    error.push("password is not strong");
  }
  if (!confirmPassword) {
    error.push("confirm password is required");
  }
  if (password && confirmPassword && password !== confirmPassword) {
    error.push("password and confirm password do not match");
  }
  if (!email) {
    error.push("email is required");
  }
  if (email && !isEmail(email)) {
    error.push("email is not a valid");
  }
  // if email is provided by user and it is in valid format then we are suppose to check wheter it is exist or not
  if (email && isEmail(email)) {
    
  }
  if (!contact) {
    error.push("contact is required");
  }
  if (contact && contact.length !== 10) {
    error.push("contact is not valid");
  }
  if (contact) {
    const check_number = async (contact) => {
      const data = await validateContact(contact);
      const { isValidNumber } = data;
      // 4567894567: for validating that it's not correct
      if (!isValidNumber) error.push("contact is not valid");
    };
    await check_number(contact);
  }
  if (error.length > 0) {
    return error;
  }
}
