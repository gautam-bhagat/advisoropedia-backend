const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SALT_ROUNDS = 10;
const hashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}

const matchPassword = async (plainPassword,hashedPassword) =>{
    let passwordMatches = await bcrypt.compare(plainPassword, hashPassword);
    return passwordMatches;
}

module.exports = {
    hashPassword,matchPassword
}