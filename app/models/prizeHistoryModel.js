const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const prizeHistorySchema = new Schema({
id: mongoose.Types.ObjectId,
user:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
},
prize:{
    type: mongoose.Types.ObjectId,
    ref: "Prize",
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
module.exports = mongoose.model("PrizeHistory ", prizeHistorySchema);
