const ClientModel = require('../models/client')

async function get(req, res) {
    const { id } = req.params

    const obj = id ? { _id: id } : null

    const clients = await ClientModel.find(obj)

    res.send(clients)
}

async function post(req, res) {
    const {
        name,
        email,
        phone,
        address
    } = req.body

    const client = new ClientModel({
        name,
        email,
        phone,
        address
    })

    client.save()

    res.send(client)
}

module.exports = {
    get,
    post
}