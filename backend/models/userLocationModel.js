import { Schema, model } from 'mongoose';

const tempSchema = Schema({
    latitude : {
        type : Number,
    }
    ,
    longitude : {
        type : Number,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required: true,
    }
});

export default model("Temp",tempSchema);