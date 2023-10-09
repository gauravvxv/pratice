const bcrypt = require("bcrypt");
const {Router} = require("express");
const {UserModel} = require("../models/user.model")
const userController = Router();
const jwt = require("jsonwebtoken");

userController.post("/signup",(req,res)=>{
    const {email,password,age}= req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
      if(err){
        res.send("Error");
      }
      const user =  new UserModel({
        email,
        password: hash,
        age
      })
    try { 
        await user.save();
        res.send("signin successfull");
    } catch (error) {
        console.log(error)
        res.send("something when wrong")
    }
    });
})

userController.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.find({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
   if(err){
    res.send(err);
   }
   if(result){
  const token = jwt.sign({userId: user._id},process.env.JWT_SECRET);
  res.send({msg : "Successfull", token})
   }
   else{
    res.send("Invalid critials") 
   }
    });
})

module.exports={
    userController
}