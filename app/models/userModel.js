const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
id: mongoose.Types.ObjectId,
username:{
    type: String,
    unique: true,
    require: true,
},
firstname:{
    type: String,
    require: true
},
lastname:{
    type: String,
    require: true
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
module.exports = mongoose.model("User", userSchema);
