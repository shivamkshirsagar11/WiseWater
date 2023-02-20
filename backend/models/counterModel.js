import { Schema, model } from 'mongoose';

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

const CounterModel = model('counters', CounterSchema);


export default CounterModel;