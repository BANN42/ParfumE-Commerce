import Product from "../model/Product.js";

export async function createProduct(req  , res) {
    try{
        let currentClient = new Product(req.body);
        await currentClient.save()
        return res.status(201).json({message : "Product Has Been Added ..." , ID  : currentClient._id});

    }catch(error){
        return res.status(500).json({error : error.message})
    }
}


export async function getAllProducts(req, res) {
    try{
        let allProducts = await Product.find();
        if(!allProducts.length){
            return res.status(200).json({allProducts , message: "No Product Registered Yet" , found : false});
        }else{
            return res.status(200).json({allProducts , message : allProducts , found : true})
        }
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}
