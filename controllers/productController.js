import Product from "../model/Product.js";
import { FrontPagination } from "../utils/FrontBackPagePagination.js";
import { productValidationUpdating } from "../utils/ProductValidation.js";

export async function createProduct(req  , res) {
    try{
        let currentClient = new Product(req.body);
        await currentClient.save()
        return res.status(201).json({message : "Product Has Been Added ..." , ID  : currentClient._id});

    }catch(error){
        return res.status(500).json({error : error.message})
    }
}  


export async function getProducts(req, res) {
    try{
        let pg = req.query.page;
        let lmt = req.query.limit;
        let [page , limit , skip]  = FrontPagination(pg  , lmt );
        
        Promise.all([Product.countDocuments() , Product.find().skip(skip).limit(limit)])
        .then(function([nbDocuments , targetProducts]) {
            let totalPages = Math.ceil(nbDocuments/limit);
        return res.status(200).json({targetProducts , page , totalPages  , nbDocuments})
        }).catch(function(error) {
            return res.status(500).json({error : error.message})
        })
        
        
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}




export async function getProductById(req ,res) {
    try{
        let Id = req.params.id;
        let targetProduct = await Product.findById(Id);
        return targetProduct ? res.status(200).json({targetProduct , isFounded : true}):
        res.status(404).json({isFounded : false , message : "Product Not Found"});
    }catch(error){
        return error.name.toLowerCase() === "casterror" ? res.status(400).json({error : "Enter A valide Id" , isFounded : false}):
        res.status(500).json({error : error.message })
    }
}


export async function updateProductById(req, res) {
    try{
        let content = req.body;
        
    }catch(error){

    }
}