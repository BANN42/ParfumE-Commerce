import Product from "../model/Product.js";
import { FrontPagination } from "../utils/FrontBackPagePagination.js";

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
