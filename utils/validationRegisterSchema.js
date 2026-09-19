import Joi from "joi";


const userSchema = Joi.object({
        username : Joi.string().min(3).required() ,
        email : Joi.string().email().required(), 
        password  : Joi.string().min(12).required(),
        birthday : Joi.date().custom(function(value, helper){
            
            let givenDate = new Date(value);
            let curnetDate = new Date.now();
            let actuallyAge = curnetDate - givenDate;
            let TheAge = actuallyAge/(1000*60*60*24*365)
            if(TheAge < 18){
                return helper.message('The Must Be Greater Than 18 Yo')
            }
            return true
        }) ,// need to be greater than 18yo,
        phone : Joi.string().required(),
        isVerified : Joi.boolean().default(false),
        gender : Joi.string().valid('Male', 'Female'),
        img : Joi.string().required()
        });




export const userSchemaValidator = (userSchema)=>{
    return function(payload) {
        return userSchema.validate(payload , {
            abortEarly : false
        })
    }
}


export const userRegisterValidator = userSchemaValidator(userSchema)


