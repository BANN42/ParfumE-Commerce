import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config()

let SECRET_KEY = process.env.SECRET_key;

/*
  Handle Token 
  create AccessToken / token if not exists
  create RefreshToken
  // check the token expirency
  if the token is invalide or expired refresh the token or let the user sing in again (Login)
*/


import generateToken from "../utils/generateToken";




function hasValideToken(req, res, next) {
  try{
    
  }catch(error) {
    return res.status(500).json({error : error.message});
  }
}

