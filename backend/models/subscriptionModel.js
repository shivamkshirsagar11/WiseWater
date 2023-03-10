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
        type: Schema.Types.String
    },
    remaining_days:{
        required: true,
        type: Schema.Types.Number
    },
    next_date:{
        type: Schema.Types.String,
        defaultValue:null
    },
    worker_id:{
        defaultValue:null,
        type: Schema.Types.ObjectId
    },
    company_name: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
        ref: 'Company'
    },
    status:{
        type: Schema.Types.String,
        defaultValue:"pending"
    },
    quantity:{
        type: Schema.Types.Number,
        required: true,
    }
})

export default model("Subscription", SubscriptionModel)