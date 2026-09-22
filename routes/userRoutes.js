

import express from "express";
import m_validationRegisterClaims from "../middlewares/validation/m_validationRegisterClaims.js";
import { appendUserInDatabase } from "../controllers/userController.js";
import CloudinaryUploadImageMiddleware from "../middlewares/uploadImg.js";
import m_uploadMulterMiddleware from "../middlewares/m_MulterMiddleware.js";

const userAuthRoutes = express.Router();

// register

userAuthRoutes.post('/register' , m_uploadMulterMiddleware.single('img') ,  CloudinaryUploadImageMiddleware  , m_validationRegisterClaims,  async function (req, res) {
    try{
        await appendUserInDatabase(req, res)
    }catch(error){
        return res.status(500).json({error : error.message});
    }
});

// verify Account

// login

// update Account Claims

// logout



export default userAuthRoutes;