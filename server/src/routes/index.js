const router = require('express').Router()

const AdminController = require('../controllers/admin')
const ClientController = require('../controllers/client')
const ProductController = require('../controllers/product')

router.get('/admin/:id', AdminController.get)
router.post('/admin', AdminController.post)

router.get('/cliente/:id?', ClientController.get)
router.post('/cliente', ClientController.post)

router.get('/produtos/:id?', ProductController.get)
router.post('/produtos', ProductController.post)
router.put('/produtos/:id', ProductController.put)
router.delete('/produtos/:id', ProductController.remove)


module.exports = router