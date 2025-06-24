const schemea = require('mongoose').Schema;
const userSchema=new schemea({
    username:{
        type:String,
        rewured:true,
    },
    password:{
        type:String,
        required:true,
    }
})
module.exports = require('mongoose').model('mydatabase',userSchema);