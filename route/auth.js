const bypass = require("../middleware/bypass");
const {
    hashPassword,matchPassword
} = require("../utils/services")

const express = require('express')
const router = express.Router();



router.get("/",bypass,(req,res)=>{
    res.send("Working")
})

module.exports = router