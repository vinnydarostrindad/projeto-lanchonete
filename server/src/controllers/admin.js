const AdminModel = require('../models/admin')
const pwd = require('../utils/password')

async function get(req, res) {
    const { id } = req.params

    const admin = await AdminModel.findById(id)

    res.send(admin)
}

async function post(req, res) {
    const {
        name,
        password
    } = req.body
    
    const admins = await AdminModel.find()

    const foundAdmin = admins.find(admin => name == admin.name)
     
    if (foundAdmin != undefined) {
        const comparePwd = pwd.encryptPwd(password, foundAdmin.password)
        if (comparePwd === true) {
            res.send(foundAdmin._id)
        } else {
            res.send(false)
        }
    } else {
        res.send(false)
    }
}

module.exports = {
    get,
    post,
}