const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    password: String,
})

const Model = mongoose.model('admins', schema)

module.exports = Model