const validator = require('validator');
const { default: validateContact } = require('../validateContact');

exports.userValidation = (userData) => {
    const { firstname, email, password, confirmPassword, lastname, contact } = userData;
    const error = [];
    if (!firstname) {
        error.push('Firstname is required');
    }
    if (!lastname) {
        error.push('Lastname is required');
    }
    if (!password) {
        error.push('Password is required');
    }
    if (password && !validator.isStrongPassword(password)) {
        error.push('password is not strong');
    }
    if (!confirmPassword) {
        error.push('confirm password is required');
    }
    if (password && confirmPassword && password !== confirmPassword) {
        error.push('password and confirm password do not match');
    }
    if (!email) {
        error.push('email is required');
    }
    if (email && !validator.isEmail(email)) {
        error.push('email is not a valid');
    }
    if (!contact) {
        error.push('contact is required');
    }
    if (contact && contact.length !== 10) {
        error.push('contact is not valid');
    }
    if (contact) {
        async ()=>{
        const data = await validateContact(contact);
        const {isValidNumber} = data;
        if(!isValidNumber)
        error.push('contact is not valid');
        }
    }
    if (error.length > 0) {
        return error;
    }
}