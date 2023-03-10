import { addressValidation } from '../shared/addressValidation.js';
import pkg from 'validator';
const { isEmail } = pkg;
import Company from '../../models/companyModel.js';

export async function companyValidation(companyData) {

    const { name, email, contact, serviceTime, address, waterPrice } = companyData;

    const addressValidationError = addressValidation(address);

    var error = [];

    if (addressValidationError) {
        error = error.concat(addressValidationError);
    }
    if (!name) {
        error.push('company name is required');
    }
    if (!email) {
        error.push('company email is required');
    }
    if (email && !isEmail(email)) {
        error.push('email is not a valid');
    }
    if (!contact) {
        error.push('contact is required');
    }
    if (contact && contact.length !== 10) {
        error.push('contact is not valid');
    }
    if (contact) {
        async () => {
            const data = await validateContact(contact);
            const { isValidNumber } = data;
            if (!isValidNumber)
                error.push('contact is not valid');
        }
    }
    if (!serviceTime) {
        error.push('service time is required');
    }
    if (serviceTime && false) {
        // validation is required
    }
    if ('' === waterPrice.coldWater) {
        error.push('water price for cold water is required');
    }
    if ('' === waterPrice.normalWater) {
        error.push('water price for normal water is required');
    }
    if ('' === waterPrice.hotWater) {
        error.push('water price for hot water is required');
    }
    if (error.length > 0)
        return error;
    else {
        try {
            const checkCompany = await Company.findOne({ $or: [{ email }, { name }, { contact }] });
            if (checkCompany) {
                return { errorMessage: ['company is alrady exists'], statusCode: 404 };
            }
        } catch (error) {
            return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
        }
    }
}