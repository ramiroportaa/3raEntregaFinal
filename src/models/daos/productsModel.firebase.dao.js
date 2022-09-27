import { FirebaseContainer } from "../containers/firebase.container.js";

class ProductsModel extends FirebaseContainer {
    constructor(){
        super("products");
    }
}

export default new ProductsModel();