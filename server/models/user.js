var mongoose = require('mongoose')

var userModel = mongoose.model('user', 
new mongoose.Schema({ 
                     name: {type:String
                           ,required: true
                           ,trim:true
                           ,minlength:1 }
                    , family:String 
                    , location:String 
                    , age:Number 
                    , email:{ type:String
                            ,required:true
                            ,trim:true
                            ,minlength:1}
                    }));

module.exports = { userModel }