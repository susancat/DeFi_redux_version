import mongoose from "mongoose"

const RecordSchema = new mongoose.Schema({
    account: { type: String, unique: true },
    balances: Array
})

export default mongoose.models.Record || mongoose.model("Record", RecordSchema);