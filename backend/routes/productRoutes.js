const router=require('express').Router()
const c=require('../controllers/productController')

router.post('/addproduct',c.addProduct)
router.post('/removeproduct',c.removeProduct)
router.get('/allproducts',c.getAllProducts)
router.get('/newcollections',c.newCollections)
router.get('/popularinwomen',c.popularWomen)

module.exports=router
