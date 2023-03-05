import { Schema } from 'mongoose';
const addressSchema = Schema(
    {
        line1: {
            type: String,
            required: [true,"line1 be blank"]
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: [true,"city can not be blank"]
        },
        pincode: {
            type: String,
            reqired : [true,"pincode can not be blank"],
        },
        state: {
            type: String,
            required: [true, "can't be blank"], 
        },
    },
)

export default addressSchema;
