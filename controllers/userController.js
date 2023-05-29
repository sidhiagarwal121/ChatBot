const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const registerLoad=async(req,res)=>{
    try
    {
        res.render('register')
    }
    catch(err)
    {
        console.log(err)
    }

}
const register=async(req,res)=>{
    const passwordHash= await bcrypt.hash(req.body.password,10);
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        image:'images/'+req.file.filename,
        password:passwordHash
    })
    user.save();
    res.render('register',{message:"user registerd successfully"})

    
}
module.exports={
    registerLoad,
    register
}