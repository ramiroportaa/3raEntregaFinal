import { MongoContainer } from "../containers/mongo.container.js";

class CartModel extends MongoContainer {
    constructor(){
        super("cart", {
            timestamp: {type: Number, require: true},
            productos: {type: Array, require: true}
        })
    }
}

export default new CartModel();