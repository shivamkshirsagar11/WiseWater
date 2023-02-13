import { Schema, model } from 'mongoose';

const tempSchema = Schema({
    latitude : {
        type : Number,
    }
    ,
    longitude : {
        type : Number,
    }
});

export default model("Temp",tempSchema);