const AdminModel = require('../models/admin')
const pwd = require('../utils/password')

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
            res.send({
                loggedAdmin: foundAdmin
            })
        } else {
            res.send({
                loggedAdmin: {}
            })
        }
    } else {
        res.send({
            loggedAdmin: {}
        })
    }
}

module.exports = {
    post
}