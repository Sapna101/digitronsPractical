let mongoose = require('mongoose')

let bookedslotSchema = new mongoose.Schema({
  time : { type : Number },
  date : { type : String },
  firstname : { type : String },
  lastname : { type : String },
  phonenumber : { type : Number}
})

module.exports = mongoose.model('bookedslots', bookedslotSchema)
