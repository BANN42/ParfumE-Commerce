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


        let totalDocument=  Product.countDocuments();
        let totalPage = (page- 1) * (limit-10)


        let pg = req.query.page;
        let lmt = req.query.limit 
        let [page , limit , skip]  = FrontPagination(pg  , lmt);
     
        let targetProducts = await Product.find().skip(skip).limit(limit);
        if(!targetProducts.length){
            return res.status(200).json({targetProducts , message: "No Product Registered Yet" , found : false});
        }else{
            return res.status(200).json({targetProducts  , found : true})
        }
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}
