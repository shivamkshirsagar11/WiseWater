exports.checkUserValidation = async (userData) => {
    const { firstname, email, password, confirmPassword, lastname, address, contact } = userData;
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
    if (false) {
        // check the contact validation whather it contains alphabet and other stuff
    }
    if (!address.line1) {
        error.push('address line1 required');
    }
    if (!address.line2) {
        error.push('address line2 required');
    }
    if (!address.city) {
        error.push('address city required');
    }
    if (!address.pincode) {
        error.push('address pincode required');
    }
    if (false) {
        // validte pincode
        // res.status(400);
    }
    if (!address.state) {
        error.push('address state required');
    }
    if (error.length > 0) {
        return { errorMessage: error, statusCode: 400 };

    } else {
        // Check if user already exsist
        try {
            const checkUser = await Customer.findOne({ $or: [{ email: email }, { contact: contact }] });
            if (checkUser) {
                return { errorMessage: ['Your email already exited'], statusCode: 404 };
                // res.status(404).json({
                //     error: {
                //         errorMessage: ['Your email already exited']
                //     }
                // })
            }
        } catch (error) {
            return { errorMessage: ['Interanl Server Error'], statusCode: 500 };
            // res.status(500).json({
            //     error: {
            //         errorMessage: ['Interanl Server Error']
            //     }
            // })
        }
    }
}