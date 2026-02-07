const router=require('express').Router()
const c=require('../controllers/userController')

router.post('/signup',c.signup)
router.post('/login',c.login)

module.exports=router
