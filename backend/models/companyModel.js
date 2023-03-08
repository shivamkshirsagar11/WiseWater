import { Schema, model } from 'mongoose';
import addressSchema from './addressModel.js';

const companySchema = Schema(
    {
        name: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "please give company name"]
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid']
        },
        contact: {
            type: Number,
            unique: [true, "contact number is already exist"],
            required: [true, "Cant't be blank"],
            match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/, "is Invalid"]
        },
        address: {
            type: addressSchema,
            required: [true, "address is required"],
        },
        rating: {
            type: Number,
            default: 0
        },
        waterPrice: {
            type: Object,
        },
        status: {
            type: String
        },
        serviceTime: {
            // check when entry is made to database
            type: String,
            required: [true, "can't be blank"],
        }
    }
)

export default model('Company', companySchema);