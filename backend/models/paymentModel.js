import { Schema, model } from 'mongoose';

const paymentSchema = Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    company_name: {
        type: String,
        lowercase:true,
        required: true,
    },
    payment: {
        type: Object
    }
});

export default model("Payment", paymentSchema);