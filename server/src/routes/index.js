const router = require('express').Router()

const AdminController = require('../controllers/admin')
const ClientController = require('../controllers/client')

router.post('/admin', AdminController.post)
router.post('/cliente', ClientController.post)

module.exports = router