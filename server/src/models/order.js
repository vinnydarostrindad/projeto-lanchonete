const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    clientId: String,
    productId: String,
    date: String,
    status: String
})

const Model = mongoose.model('orders', schema)

module.exports = Model