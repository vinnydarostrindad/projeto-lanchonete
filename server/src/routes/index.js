const router = require('express').Router()

const AdminController = require('../controllers/admin')
const ClientController = require('../controllers/client')

router.get('/admin/:id', AdminController.get)
router.post('/admin', AdminController.post)

router.get('/cliente/:id?', ClientController.get)
router.post('/cliente', ClientController.post)


module.exports = router