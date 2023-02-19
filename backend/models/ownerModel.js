import { Schema, model } from 'mongoose';

const ownerSchema = Schema({
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
    password:{
        type: String,
        required: [true, "can't be blank"], 
    },
    contact:{
        type:Number,
        unique: [true,"contact number is already exist"],
        required:[true, "Cant't be blank"],
        match: [/^[(]?[0-9]{3}[)]?[\s\.]?[0-9]{3}[\s\.]?[0-9]{4,6}$/,"is Invalid"]
    },
    company_name: {
        type: Schema.Types.String,
        required: true,
        lowercase:true,
        ref: 'Company'
    },
    latitude : {
        type : Number,
        default: null
    }
    ,
    longitude : {
        type : Number,
        default: null
    },
});
export default model('Owner',ownerSchema);