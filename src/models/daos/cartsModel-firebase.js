import { ContenedorFirebase } from "../contenedores/ContenedorFirebase.js";

class CartModel extends ContenedorFirebase {
    constructor(){
        super("carts");
    }
}

export default new CartModel();