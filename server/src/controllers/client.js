const ClientModel = require('../models/client')

async function get(req, res) {
    const clients = await ClientModel.find()

    res.send(clients)
}

async function post(req, res) {
    let registeredClient = undefined
    let ok = true

    const {
        name,
        email,
        phone,
        address
    } = req.body
    
    const clients = await ClientModel.find()

    clients.forEach(client => {
        if (email == client.email || phone == client.phone) {
            ok = false
        }
    }) 

    if (ok == true) {
        const client = new ClientModel({
            name,
            email,
            phone,
            address
        })
    
        client.save()
    } else {
        registeredClient = clients.find(client => email == client.email && phone == client.phone)
    }

    res.send({
        ok,
        registeredClient
    })
}

module.exports = {
    get,
    post
}