import mongoose from "mongoose";


const ParfumSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    brand : {
        type: String, 
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    price : {
        type: Number, 
        required : true,
        min :0,
    },
    category: {
        type :String, 
        enum : ['Female', 'Male' , "Mixte"]
    },
    volume : {
        type : Number,

    },
    stock :{
        type : Number, 

    },
    img : {
        type : String,
       
    }
} , {
    timestamps : true
})


let Product = mongoose.model('Product' , ParfumSchema);
export default Product;

