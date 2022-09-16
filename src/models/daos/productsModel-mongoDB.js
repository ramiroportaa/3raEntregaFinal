import { ContenedorMongo } from "../contenedores/ContenedorMongo.js";

class ProductsModel extends ContenedorMongo {
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
}

export default new ProductsModel();