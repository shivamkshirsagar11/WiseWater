import { Schema, model } from 'mongoose';

const paymentSchema = Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
        required: true,
        ref: 'Customer'
=======
        required: true
    },
    customer_name: {
        type: String,
        required: true,
    },
    customer_contact: {
        type: Number,
        required: [true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/, "is Invalid"]
    },
    company_contact: {
        type: Number,
        required: [true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/, "is Invalid"]
>>>>>>> 9e042aa5c04475af0a7fc08bdf0b647e4fffefc1
    },
    company_name: {
        type: String,
        lowercase: true,
        required: true,
<<<<<<< HEAD
        ref: 'Company'
=======
>>>>>>> 9e042aa5c04475af0a7fc08bdf0b647e4fffefc1
    },
    payment: {
        type: Object
    }
});

export default model("Payment", paymentSchema);