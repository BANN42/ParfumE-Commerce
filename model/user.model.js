import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();


const UserSchema  = new  mongoose.Schema({
    username: {
        type : String,
        required : [true, "User name is Required"]
    },
    email : {
        type : String,
        required: [true , "Email is Required"],
        unique : true 
    },
    password : {
        type : String,
        required : [true , 'Email is Required']
    }, 
    birthday : {
        type  : String,
        required  : true
    },
    phone: {
        type : String,
        required : [true , 'Please Provide a Correct Phone Number']
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    role: { 
    type: String, 
    enum: ['admin', 'user', 'guest'],
    default : "guest"
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


// this hooks fully focus at the password Hash
UserSchema.pre('save' , async function (){
    if(this.isModified("password")){
        let salt  = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
    }
   
    
}) 


const User = mongoose.model('User', UserSchema);

export default User;

