import { Schema, model } from 'mongoose';
import addressSchema from './addressModel.js';
import getNextSequenceValue from './getNextSequenceValue.js';
import CounterModel from './counterModel.js';

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
        lowercase: true,
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
    },
    orderId: {
        type: Number,
        required: true,
    }
    // seq: { type: Number, default: await getNextSequenceValue() }
});
orderSchema.virtual("orderid").get(async function () {
    const counter = await CounterModel.findOneAndUpdate(
        { _id: "orderid" },
        { $inc: { seq: 1 } },
        { new: true }
    );
    return counter.seq;
});

export default model("Order", orderSchema);