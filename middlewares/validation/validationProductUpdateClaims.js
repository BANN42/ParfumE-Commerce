import { productValidationUpdating } from "../../utils/ProductValidation.js";

export function m_validationProductClaimsUpdate(req ,res , next){
    try{
        let {error} = productValidationUpdating(req.body);
        if(error){
            return res.status(400).json({error : error.message});
        }else{
            next();
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({error : error.message});
    }
}


