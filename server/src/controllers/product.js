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

async function put(req, res) {
    console.log(req.params)
    const { id }  = req.params

    const product = await ProductModel.findByIdAndUpdate({ _id: id}, req.body, { new: true })

    res.send(product)
}

async function remove(req, res) {
    const { id } = req.params

    await ProductModel.findByIdAndDelete(id)
}

module.exports = {
    get,
    post,
    put,
    remove
}