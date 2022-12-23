const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
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
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        city: {
            type: String
        },
        pin: {
            type: String,
            match:[/^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$/,"is Invalid"]
        },
        state: {
            type: String,
            required: [true, "can't be blank"], 
        },
        // we will create object of type schema for address
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
})
module.exports = mongoose.model("Customer",customerSchema)