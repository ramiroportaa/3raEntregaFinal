import { FirebaseContainer } from "../containers/container.DAO.firebase.js";

let instance = null;

class CartModel extends FirebaseContainer {
    constructor(){
        super("carts");
    }

    static getInstance(){
        if(!instance){
            instance = new CartModel();
        }

        return instance;
    }
}

export default CartModel;