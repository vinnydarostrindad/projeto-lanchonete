const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    clientCode: String,
    productCode: String,
    date: String,
    status: String
})

const Model = mongoose.model('orders', schema)

module.exports = Model