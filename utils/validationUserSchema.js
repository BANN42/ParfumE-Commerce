import Joi from "joi";


const SchemaUser = Joi.object({
        username : Joi.string().min(3).required() ,
        email : Joi.string().email().required(), 
        password  : Joi.min(12).string().required(),
        birthday : Joi.date().required() ,// need to be greater than 18yo,
        phone : Joi.string().required(),
        isVerified : Joi.boolean().default(false),
        gender : Joi.valid('Male', 'Female'),
        img : Joi.string().required()
        })


const userSchemaValidator = (userSchema)=>{
    return function(payload) {
        userSchema.validate(payload , {
            abortEarly : false
        })
    }
}


export default userRegisertationClaimsValidator = userSchemaValidator(SchemaUser)
