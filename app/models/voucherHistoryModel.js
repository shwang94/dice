const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const voucherHistorySchema = new Schema({
id: mongoose.Types.ObjectId,
user:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
},
voucher:{
    type: mongoose.Types.ObjectId,
    ref: "Voucher",
    require: true,
},
createdAt:{
    type: Date,
    default: Date.now()
},
updatedAt:{
    type: Date,
    default: Date.now()
}
});
module.exports = mongoose.model("VoucherHistory ", voucherHistorySchema);
