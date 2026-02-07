const Product=require('../models/Product')

exports.addProduct=async(req,res)=>{
 let products=await Product.find({})
 let id = products.length>0 ? products.slice(-1)[0].id+1 : 1

 const product=new Product({...req.body,id})
 await product.save()

 res.json({success:true,name:req.body.name})
}

exports.removeProduct=async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id})
  res.json({success:true})
}

exports.getAllProducts=async(req,res)=>{
  res.send(await Product.find({}))
}

exports.newCollections=async(req,res)=>{
  let products=await Product.find({})
  res.send(products.slice(1).slice(-8))
}

exports.popularWomen=async(req,res)=>{
  let products=await Product.find({category:"women"})
  res.send(products.slice(0,4))
}
