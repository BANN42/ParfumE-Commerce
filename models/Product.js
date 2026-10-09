import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    createdByUser: {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    name : {
        type: String,
        required : true
    },
    brand : {
        type: String, 
        // required : true
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
        defaul : null
    },
    stock :{
        type : Number, 
        default : 0
    },
    imgs : {
        type : [String],
    }
} , {
    timestamps : true
})


let Product = mongoose.model('Product' , ProductSchema);
export default Product;

