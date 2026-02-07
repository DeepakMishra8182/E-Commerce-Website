const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()

// DB
require('./config/db')

// middleware
app.use(express.json())
app.use(cors())
app.use('/images',express.static('upload/images'))

// routes
app.use('/',require('./routes/uploadRoutes'))
app.use('/',require('./routes/productRoutes'))
app.use('/',require('./routes/userRoutes'))
app.use('/',require('./routes/cartRoutes'))

app.get('/',(req,res)=>{
  res.send('express app is running')
})

const port=4000
app.listen(port,()=>console.log(`server running ${port}`))
