import { FirebaseContainer } from "../containers/container.DAO.firebase.js";

let instance = null;

class ProductsModel extends FirebaseContainer {
    constructor(){
        super("products");
    }

    static getInstance(){
        if(!instance){
            instance = new ProductsModel();
        }
        
        return instance;
    }
}

export default ProductsModel;