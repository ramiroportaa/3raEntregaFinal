import { MongoContainer } from "./containers/container.DAO.mongo.js";
import productModel from "../product.model.js";

let instance = null;

class ProductDAO extends MongoContainer {
    constructor(){
        super("product", productModel);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductDAO();
        }
        
        return instance;
    }
}

export default ProductDAO;