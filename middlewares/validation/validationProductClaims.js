import { productValidation } from "../../utils/ProductValidation.js";

export function m_validationProductClaims(req, res, next) {
    try{
        let {error} = productValidation(req.body);
        if(!error){
            next()
        }else{
            return res.status(400).json({error : error.message});
        }
    }catch(error) {
            return res.status(500).json({error : error.message})
    }
}

