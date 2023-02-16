import { Schema, model } from 'mongoose';
import addressSchema from './addressModel.js';

// water_type,water_temperature,water_quantity,companyname

const orderSchema = Schema({
    water_type: {
        type: String,
        required: [true, "can't be blank"],
    },
    water_quantity: {
        type: Number,
        required: [true, "can't be blank"],
    },
    address: {
        type: addressSchema,
        required: [true, "address is required"],
    },
    company_name: {
        type: String,
        lowercase:true,
        required: true,
        ref: 'Company'
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    status: {
        type: String,
        required: true,
        defaultValue: 'pending'
    },
    cost: {
        type: Number,
        required: true,
    },
    worker_id: {
        type: Schema.Types.ObjectId,
        defaultValue: null,
        ref: 'Worker'
    }
});

export default model("Order", orderSchema);