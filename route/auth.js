const bypass = require("../middleware/bypass");
const AdvisorUser = require("../models/AdvisorUser");
const sendEmail = require("../utils/sendEmail");
const { hashPassword, matchPassword } = require("../utils/services");

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
    sendEmail(newUser.email, "Advisorpedia || Verify Email || Gautam Bhagat", "Hello "+newUser.name+"\nKindly Verify yourself\n\n"+fullUrl);
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

module.exports = router;
