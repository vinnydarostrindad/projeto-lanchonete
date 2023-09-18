const OrderModel = require('../models/order')

async function get(req, res) {
    const { id } = req.params

    const obj = id ? { _id: id } : null

    const orders = await OrderModel.find(obj)

    res.send(orders)
}

module.exports = {
    get
}