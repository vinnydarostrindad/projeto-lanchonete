const bcrypt = require('bcrypt')

function encryptPwd(pwd, cryptedPwd) {
    return bcrypt.compareSync(pwd, cryptedPwd)
}

module.exports = {
    encryptPwd
}