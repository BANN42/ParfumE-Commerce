
import CloudinaryConfig from "../config/cloudinaryConfig.js";
import User from "../model/user.model.js";


export async function appendUserInDatabase(req, res) {
    try{
        let {username , email , password,birthday, phone, isVerified, role , gender , img } = req.body;
        let user = new User({
            username, email, password  , birthday, phone, isVerified , role ,gender ,  img
        });
        
      
        
        await user.save();
        return res.status(201).json({message : "The User Has Been Created ..."})
    }catch(error) {
        return res.status(500).json({error : error.message});
    }
    
}