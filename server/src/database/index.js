const mongoose = require('mongoose')

connect().then(console.log('Connected to database!')).catch(err => console.log(err))

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/lanchonete-vinont')
}

module.exports = { connect }