import Company from '../../models/companyModel.js';
import WorkerApplication from '../../models/workerApplicationModel.js';
import pkg from 'validator';
const { isEmail } = pkg;

export async function workerValidation(worker) {

    const { firstname, email, lastname, contact, companyname } = worker;

    const error = [];

    if (!firstname) {
        error.push('Firstname is required');
    }
    if (!lastname) {
        error.push('Lastname is required');
    }
    if (!email) {
        error.push('email is required');
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
        async ()=>{
            const data = await validateContact(contact);
            const {isValidNumber} = data;
            if(!isValidNumber)
            error.push('contact is not valid');
            }
    }

    if( error.length > 0 ) {
        return { errorMessage: error, statusCode: 400 };
    }

    try {
        // check whether the company is exist or not
        const company = await Company.findOne({ name: companyname });
        if (null === company) {
            return { errorMessage: ['company with this name is not exist'], statusCode: 404 };
        }

        //  if user already applied for this company then don't allow to apply again
        const workerExists = await WorkerApplication.findOne({ $or: [{ email, company_name: companyname }, { contact: contact, company_name: companyname }] });
        if (workerExists) {
            return { errorMessage: ['you already applied for this company'], statusCode: 404 };
        }
    } catch (error) {
        return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
    }
}