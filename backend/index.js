const port=4000
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
const cors=require('cors')
const { error } = require('console')
const bcrypt =require("bcrypt");

require('dotenv').config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log('database connected')
})
.catch((err)=>console.log(err))

app.get('/',(req,res)=>{
  res.send('express app is running')
})

// Image storage engine
const storage=multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload=multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
res.json({
  success:1,
  image_url:`http://localhost:${port}/images/${req.file.filename}`
})
})


const Product=mongoose.model("product",{
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true,
  },
  image:{
   type:String,
   required:true
  },
  category:{
    type:String,
    required:true
  },
  new_price:{
    type:Number,
    required:true
  },
  old_price:{
    type:Number,
    required:true
  }, 
  date:{
    type:Date,
    default:Date.now()
  },
  available:{
    type:Boolean,
   default:true
  }
})

app.post('/addproduct',async(req,res)=>{
 let products=await Product.find({})
 let id;
 if(products.length>0){
  let last_product_array=products.slice(-1)
  let last_product=last_product_array[0]
  id=last_product.id+1;
 }
 else{
  id=1
 }
   const product=new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
   })
   console.log(product)
   await product.save();
   console.log('saved')
   res.json({
    success:true,
    name:req.body.name
   })
})

//creating api for deleting products
app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id})
  console.log("removed")
  res.json({
    success:true,
    name:req.body.name
  })
})

//creating api for getting all products
app.get('/allproducts',async(req,res)=>{
  let products=await Product.find({})
  console.log('All Products Fetched')
  res.send(products)
})

const Users=mongoose.model('Users',{
  name:{
    type:String
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
  },
 cartData:{
  type:Object,
 },
 date:{
  type:Date,
  default:Date.now
 }
})
// Creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
  let check=await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,error:'existing user found with same email address'})
  }
  let cart={}
  for(let i=0;i<300;i++){
    cart[i]=0;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user=new Users({
    name:req.body.username,
    email:req.body.email,
    password:hashedPassword,
    cartData:cart
  })
  await user.save()
  const data={
    user:{
      id:user.id
    }
  }
  const token=jwt.sign(data,process.env.JWT_SECRET)
  res.json({success:true,token})
})


//creating endpoint for user loging
app.post('/login',async (req,res)=>{
  let user=await Users.findOne({email:req.body.email})
  if(user){
     const passCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }
      const token=jwt.sign(data,process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      res.json({success:false,error:"Wrong Password"})
    }
  }
  else{
    res.json({success:false,error:"Wrong email id"})
  }
})

app.get('/newcollections',async(req,res)=>{
  let products=await Product.find({});
  let newcollection=products.slice(1).slice(-8)
  console.log('New Collection fetched')
  res.send(newcollection)
})

app.get('/popularinwomen',async(req,res)=>{
  let products=await Product.find({category:"women"})
  let popular_in_women=products.slice(0,4)
  console.log('popular in women fetched')
  res.send(popular_in_women)
})

const fetchUser=async(req,res,next)=>{
  const token=req.header('auth-token')
  if(!token){
   return res.status(401).send({error:"Please authenticate using valid token"})
  }
  else{
    try{
      const data=jwt.verify(token,process.env.JWT_SECRET);
      req.user=data.user
      next()
    }
    catch(error){
    return res.status(401).send({errors:"please authenticate using a valid token"})
    }
  }
}

app.post('/addtocart',fetchUser,async(req,res)=>{
  console.log('Added',req.body.itemId)
 let userData=await Users.findOne({_id:req.user.id})
 userData.cartData[req.body.itemId]+=1;
 await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
 res.send('Added')
})

app.post('/removefromcart',fetchUser,async(req,res)=>{
  console.log('removed',req.body.itemId)
  let userData=await Users.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemId]>0){
   userData.cartData[req.body.itemId]-=1;
  }
 await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
 res.send('Removed')
})

app.post('/getcart',fetchUser,async(req,res)=>{
  console.log('GetCart')
  let userData= await Users.findOne({_id:req.user.id})
  res.json(userData.cartData)
})

app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})