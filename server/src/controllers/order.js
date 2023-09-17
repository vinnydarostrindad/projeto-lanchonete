const OrderModel = require('../models/order')

async function get(req, res) {
    const orders = await OrderModel.find()

    res.send(orders)
}

module.exports = {
    get
}