const mongoose = require('mongoose');

const crypto = require('crypto');

const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name: {
        type:string,
        required:true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type:string,
        maxlength: 32,
        trim:true
    },
    email: {
        type: string,
        trim: true,
        required:true,
        unique: true
    },
    userinfo: {
        type: string,
        trim: true
    },
    encry_password: {
        type: string,
        required: true
    },
    salt: string,
    role: {
        type:number,
        defalt: 0
    },
    purchases: {
        type: Array,
        defalt: []
    }
},{ timestampa: true});

 userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.method = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema);