import {v2 as Cloudinary} from "cloudinary";
import { config } from "dotenv";
config();



Cloudinary.config({
    cloud_name : process.env.cloud_name,
    cloud_api
})