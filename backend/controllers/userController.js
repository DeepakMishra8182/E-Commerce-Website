const Users=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signup=async(req,res)=>{
  let check=await Users.findOne({email:req.body.email});
  if(check) return res.status(400).json({success:false,error:'existing user found'})

  let cart={}
  for(let i=0;i<300;i++) cart[i]=0

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user=new Users({
    name:req.body.username,
    email:req.body.email,
    password:hashedPassword,
    cartData:cart
  })

  await user.save()
  const token=jwt.sign({user:{id:user.id}},process.env.JWT_SECRET)
  res.json({success:true,token})
}

exports.login=async(req,res)=>{
  let user=await Users.findOne({email:req.body.email})
  if(!user) return res.json({success:false,error:"Wrong email id"})

  const passCompare=await bcrypt.compare(req.body.password,user.password)
  if(!passCompare) return res.json({success:false,error:"Wrong Password"})

  const token=jwt.sign({user:{id:user.id}},process.env.JWT_SECRET)
  res.json({success:true,token})
}
