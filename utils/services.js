const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const{JWT_SECRET} = require("./constants")

const SALT_ROUNDS = 10;
const hashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}

const matchPassword = async (plainPassword,hashedPassword) =>{
    let passwordMatches = await bcrypt.compare( plainPassword,hashedPassword);
    return passwordMatches;
}

const generateToken = (user)=>{
    let data = {
        id:user._id
    }
    return jwt.sign(data,JWT_SECRET)
}

module.exports = {
    hashPassword,matchPassword,generateToken
}