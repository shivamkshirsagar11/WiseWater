import { Schema, model } from 'mongoose';

const SubscriptionModel = Schema({
    user_id:{
        required: true,
        type: Schema.Types.ObjectId
    },
    water_type:{
        type:Schema.Types.String,
        required: true
    },
    start_date:{
        required: true,
        type: Schema.Types.Date
    },
    remaining_days:{
        required: true,
        type: Schema.Types.Number
    },
    next_date:{
        required: true,
        type: Schema.Types.Date
    },
    worker_id:{
        required: true,
        defaultValue:null,
        type: Schema.Types.ObjectId
    },
    status:{
        type: Schema.Types.String,
        required: true,
        defaultValue:"pending"
    }
})

export default model("Subscription", SubscriptionModel)