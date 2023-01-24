const { checkUserValidation } = require('../../validations/checkUserValidation');
const { checkAddressValidation } = require('../../validations/checkAddressValidation');
const Customer = require('../../models/customerModel');

exports.customerValidation = async (customer) => {
    
    const userValidationError = await checkUserValidation(customer);
    const addressValidationError = checkAddressValidation(customer.address);

    var error = [];
    console.log(userValidationError)

    console.log(addressValidationError)
    if (userValidationError || addressValidationError) {

        if (userValidationError) {
            error = error.concat(userValidationError);
        }

        if (addressValidationError)
            error = error.concat(addressValidationError);
        return { errorMessage: error, statusCode: 400 };
    } else {
        console.log('we are here')
        const {email,contact} = customer;
        // Check if user already exsist
        try {
            const checkUser = await Customer.findOne({ $or: [{ email: email }, { contact: contact }] });
            if (checkUser) {
                return {errorMessage:['You are alerady signed up'],statusCode:404};
                // res.status(404).json({
                //     error: {
                //         errorMessage: ['Your email already exited']
                //     }
                // })
            }
        } catch (error) {
            console.log(error)
            return {errorMessage: ['Interanl Server Error'],statusCode:500};
            // res.status(500).json({
            //     error: {
            //         errorMessage: ['Interanl Server Error']
            //     }
            // })
        }
    }
}