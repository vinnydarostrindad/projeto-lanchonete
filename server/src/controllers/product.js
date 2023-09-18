const ProductModel = require('../models/products')

async function get(req, res) {
    const { id } = req.params

    const obj = id ? { _id: id } : null

    const products = await ProductModel.find(obj)

    res.send(products)
}

function post(req, res) {
    const {
        name,
        price
    } = req.body

    const product = new ProductModel({
        name,
        price
    })

    product.save()

    res.send(product)
}

module.exports = {
    get,
    post
}