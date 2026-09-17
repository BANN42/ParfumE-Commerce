import mongoose from "mongoose";

export function m_IsValideID(req, res , next) {
   try{
    let id = req.params.id;
    let IsValideID = mongoose.Types.ObjectId.isValid(id)
    if(!IsValideID){
        return res.status(400).json({error : "Please Provide a valide Id..."})
    }else{
        next()
    }
   }catch(error) {
    return res.status(500).json({error : error.message});
   }
}