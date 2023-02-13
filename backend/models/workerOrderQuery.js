import { Schema, model } from 'mongoose';

const workerOrderQuerySchema = Schema({
    worker_id:{
        type: Schema.Types.ObjectId,
        defaultValue:null,
        ref:'Worker'
    },
    worker_name:{
        type:String,
        required:true
    },
    worker_email:{
        type:String,
        required:true
    },
    worker_contact:{
        type:String,
        required:true
    },
    order_id:{
        type: Schema.Types.ObjectId,
        defaultValue:null,
        ref:'Order'
    },
    query:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

export default model("WorkerOrderQuery", workerOrderQuerySchema);