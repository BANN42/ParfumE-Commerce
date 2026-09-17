import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();


import main from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

 


let PORT = process.env.PORT;
// middlewares


const app  = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1/products" , productRoutes);

 
main().then(function() {
    app.listen(PORT , function(){
        console.log('The Server Is Running...')
    }) 
    console.log('data base is connected  ');
}).catch(function(error) {
    console.log(error)

    process.exit(1)
})