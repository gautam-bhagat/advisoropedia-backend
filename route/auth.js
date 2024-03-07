const bypass = require("../middleware/bypass");
const AdvisorUser = require("../models/AdvisorUser");
const sendEmail = require("../utils/sendEmail");
const {
    hashPassword,matchPassword
} = require("../utils/services")

const express = require('express')
const router = express.Router();



router.get("/",bypass,(req,res)=>{
    res.send("Working")
})

router.post("/signup",bypass,async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body;

    const user = await AdvisorUser.findOne({email:email});
    console.log(user)
    if(user){
        return res.status(303).json({success : 0 , message : "Email already in use!"})
    }

    const hashPass = await hashPassword(password);
    const newUser =await  AdvisorUser.create({
        name,
        email,
        password:hashPass
    })

    console.log(newUser);
    sendEmail(newUser.email,'Test','Hello')
    res.status(200).json({ success:1 ,message:"Kindly Verify your email!!"});
})

module.exports = router