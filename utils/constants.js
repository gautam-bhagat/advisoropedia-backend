require('dotenv').config()

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI ;
const EMAIL_ID = process.env.EMAIL_ID ;
const EMAIL_PASS = process.env.EMAIL_PASS ;

module.exports = {PORT,DB_URI,EMAIL_ID,EMAIL_PASS}