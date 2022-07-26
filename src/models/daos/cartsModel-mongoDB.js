import { ContenedorMongo } from "../contenedores/ContenedorMongo.js";

class CartModel extends ContenedorMongo {
    constructor(){
        super("cart", {
            timestamp: {type: Number, require: true},
            productos: {type: Array, require: true}
        })
    }
}

export default new CartModel();