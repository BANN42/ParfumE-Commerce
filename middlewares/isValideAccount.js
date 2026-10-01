import User from "../models/User.js";

export async function isValideAccount(req, res, next) {
    try{
        // check the account is valide/ exists at the database
         let targetUser = await User.find({email : req.body.email})
         let isTheSamePassword = bcrypt.compare(req.body.password, targetUser.password);

         if(targetUser && isTheSamePassword){
            next()
         }
         return res.status(400).json({error: "Password/ Email incorrect ."})
    }catch(error) {
        return res.status(500).json({error: error.message});
    }
}