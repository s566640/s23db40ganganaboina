const mongoose = require("mongoose")
const vehicleSchema = mongoose.Schema({
    name :String,
    color : String,
    price : Number
})
module.exports = mongoose.model("vehicles", vehicleSchema)