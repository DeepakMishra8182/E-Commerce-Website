const router=require('express').Router()
const auth=require('../middleware/auth')
const c=require('../controllers/cartController')

router.post('/addtocart',auth,c.addToCart)
router.post('/removefromcart',auth,c.removeFromCart)
router.post('/getcart',auth,c.getCart)

module.exports=router
