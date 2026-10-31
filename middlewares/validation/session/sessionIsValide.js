export function sessionIsValide(req, res, next){
    try{
        let sessionId  = req.session.id;
        if(!sessionId) return res.status(404).json({error : "Session Is Not Expired, Please Log Again"})
    }catch(error){
        return res.status(500).json({error : "Internal Server Error"});
    }
}