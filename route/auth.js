const bypass = require("../middleware/bypass");
const AdvisorUser = require("../models/AdvisorUser");
const sendEmail = require("../utils/sendEmail");
const { hashPassword, matchPassword,generateToken } = require("../utils/services");

const express = require("express");
const router = express.Router();

router.get("/", bypass, (req, res) => {
    
  res.send("Working");
});

const notVerifiedUser = () =>{

}

router.post("/signup", bypass, async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const user = await AdvisorUser.findOne({ email: email });
    console.log(user);
    if (user) {
      return res
        .status(303)
        .json({ success: 0, message: "Email already in use!" });
    }

    const hashPass = await hashPassword(password);
    const newUser = await AdvisorUser.create({
      name,
      email,
      password: hashPass,
    });

    console.log(newUser);
    var fullUrl = req.protocol + '://' + req.get('host') +"/auth/verify/"+newUser._id;
    sendEmail(newUser.email, "ADVISOROPEDIA || Verify Email || Gautam Bhagat", "Hello "+newUser.name+"\nKindly Verify yourself\n\n"+fullUrl+"\n\nRegards,\nGautam Bhagat.");
    return res
      .status(200)
      .json({ success: 1, message: "Kindly Verify your email!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: 0, message: "Internal Server Error!" });
  }
});

router.get("/verify/:id", bypass, async (req, res) => {
  try {
    const id = req.params.id;
    await AdvisorUser.findOneAndUpdate({ _id: id }, { verified: true });
    res.status(200).send("Email Verified!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: 0, message: "Internal Server Error!" });
  }
});

router.post("/login", bypass, async (req, res) => {
  try {
    const {email,password} = req.body;
    
    const user = await AdvisorUser.findOne({email:email})
    if(!user){
       return res.status(402).json({ success: 0, message: "No Account Found!!" });
    }

    if(!user.verified){
        return res.status(403).json({ success: 0, message: "Kindly Verify your email first!" });
    }

    const matches = await matchPassword(password,user.password)

    if(matches){
        return res.status(202).json({ success: 1, message: "Successfull" , token : generateToken(user)});
    }else{
        return res.status(403).json({ success: 0, message: "Invalid Credentials" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: 0, message: "Internal Server Error!" });
  }
});

module.exports = router;
