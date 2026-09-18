import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();


const UserSchema  = new  mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    }, 
    birthday : {
        type  : String,
        required  : true
    },
    phone: {
        type : String,
        require : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    role: { 
    type: String, 
    enum: ['admin', 'user', 'guest'],
    default : "guest", 
    required: true 
  },
  gender : {
    type : String, 
    enum : ["Male" , "Female"],
    required : true
  },
  img : {
    type : String, 
    // do  i need to add something more 
  }
});

UserSchema.pre('save' , async function (doc , next){
      bcrypt.hash(this.password , process.env.salt)
     next()
})



export default mongoose.model('User', UserSchema);

