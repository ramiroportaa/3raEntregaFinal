import { MongoContainer } from "../containers/container.DAO.mongo.js";

let instance = null;

class CartModel extends MongoContainer {
    constructor(){
        super("cart", {
            timestamp: {type: Number, require: true},
            productos: {type: Array, require: true}
        })
    }

    static getInstance(){
        if(!instance){
            instance = new CartModel();
        }
        
        return instance;
    }
}

export default CartModel;