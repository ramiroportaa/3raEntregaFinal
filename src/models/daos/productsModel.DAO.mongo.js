import { MongoContainer } from "../containers/container.DAO.mongo.js";

let instance = null;

class ProductsModel extends MongoContainer {
    constructor(){
        super("product", {
            timestamp: {type: Number, require: true},
            nombre: {type: String, require: true},
            descripcion: String,
            codigo: String,
            foto: String,
            precio: {type: Number, require: true},
            stock: {type: Number, require: true}
        })
    }

    static getInstance(){
        if(!instance){
            instance = new ProductsModel();
        }
        
        return instance;
    }
}

export default ProductsModel;