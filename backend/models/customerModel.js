import { Schema, model } from 'mongoose';
import addressSchema from './addressModel.js';

const customerSchema = Schema({
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    firstname: {
        type: String,
        required: [true, "can't be blank"], 
    },
    lastname:{
        type: String,
        required: [true, "can't be blank"], 
    },
    address : {
        type : addressSchema,
        required: [true, "address is required"],
    },
    contact:{
        type:Number,
        unique: [true,"contact number is already exist"],
        required:[true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]
    },
    password:{
        type: String,
        required: [true, "can't be blank"], 
    },
    latitude : {
        type : Number,
        default: null
    }
    ,
    longitude : {
        type : Number,
        default: null
    }
});

export default model("Customer",customerSchema);