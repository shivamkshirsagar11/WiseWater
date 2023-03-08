import { Schema, model } from 'mongoose';
const adminSchema = Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
    },
});

export default model("Admin", adminSchema);