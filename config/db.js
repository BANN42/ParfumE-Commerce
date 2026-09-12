import mongoose from "mongoose";
import { config } from "dotenv";
config();

let URI = process.env.MONGODB_URI;



async function main() {
    return await mongoose.connect(URI)
}


export default main;



