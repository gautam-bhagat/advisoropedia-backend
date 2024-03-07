const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        default : false
    },
    date_created :{
        type : Date,
        default :Date.now
    },
    
  });

const AdvisorUser = mongoose.model('AdvisorUser',userSchema);

module.exports = AdvisorUser;