const OrderModel = require('../models/order')

async function get(req, res) {
    const { id } = req.params

    const obj = id ? { _id: id } : null

    const orders = await OrderModel.find(obj)

    res.send(orders)
}

function post(req, res) {
    const {
        clientId,
        productId,
        date,
        status
    } = req.body

    const order = new OrderModel({
        clientId,
        productId,
        date,
        status
    })

    order.save()

    res.send(order)
}

async function put(req, res) {
    const { id } = req.params

    const orderEdited = await OrderModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

    res.send({orderEdited})
}

async function remove(req, res) {
    const { id } = req.params

    const canceledOrder = await OrderModel.findByIdAndDelete({ _id: id})

    res.send(canceledOrder)
}

module.exports = {
    get,
    post,
    put,
    remove
}