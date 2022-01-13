const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    rating: { type: Number, required: true },
    atWork: { type: Boolean, required: true },
    category: { type: String, required: true },

})
module.exports = mongoose.model('Employee', employeeSchema)
