const mongoose = require('mongoose');
const validator = require('validator');

const Client = mongoose.model("clients", {
    name: {
        type: String,
        required: true,
        minLength:2
    },
    
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('email is invalid')
        }
    },

    passport:{
        type:String,
        minLength:9,
        required:true,
    }
    
})

module.exports = Client;