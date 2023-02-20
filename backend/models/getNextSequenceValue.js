import CounterModel from "./counterModel.js";

export default async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await CounterModel.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true }
    );
    return sequenceDocument.seq;
}
