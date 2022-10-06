import { FirebaseContainer } from "../containers/firebase.container.js";

class CartModel extends FirebaseContainer {
    constructor(){
        super("carts");
    }
}

export default new CartModel();