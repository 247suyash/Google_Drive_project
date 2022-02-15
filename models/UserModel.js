"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

const UserModelSchema = new Schema({
  
  firstName: {type: String,required: true,},
  lastName: {type: String,required: true,},
  email: {type: String,required: true,},
  phoneNumber: {type: Number,required: true,},
  password: {type: String,required: true,},
  tokens:[
    {
      token:{
        type: String,
        required: true,
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});
UserModelSchema.methods.generateAuthtoken= async function(){
  try{
    let token = jwt.sign({_id :this._id}, "suyashkaransupriyakaransourabhkaranmonikasubodhkolisupriyakarandivyasinghsonali")
     this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  }catch(err){
   console.log(err)
  }
}

module.exports = mongoose.model('user', UserModelSchema);