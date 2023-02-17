import { Schema, model } from 'mongoose';

const paymentSchema = Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
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
    },
    company_name: {
        type: String,
        lowercase: true,
        required: true,
    },
    payment: {
        type: Object
    }
});

export default model("Payment", paymentSchema);