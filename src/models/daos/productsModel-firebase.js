import { ContenedorFirebase } from "../contenedores/ContenedorFirebase.js";

class ProductsModel extends ContenedorFirebase {
    constructor(){
        super("products");
    }
}

export default new ProductsModel();