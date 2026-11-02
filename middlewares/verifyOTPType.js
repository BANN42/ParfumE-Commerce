export function verifyOTPType(req, res, next){
    try{
        let {otpCode} = req.body;
        if(isNaN(+otpCode)){
            return res.status(400).json({error : "Please Enter a Valide Number (6 digits)"});
        }
        next();
    }catch(error){
        return res.status(500).json({error : "Internal Server Error"});
    }
}