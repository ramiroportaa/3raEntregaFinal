import {productsModel, cartsModel, usersModel} from "../models/index.js";

const getProducts = async (idCart)=>{
    try {
        const data = await cartsModel.getById(idCart);
        if (!data) throw {message: `no cart with ID: ${idCart}`, status: 404};
        return data.productos; 
    } catch (error) {
        throw error;
    }
};

const createCart = async (userId)=>{
    try {
        //Creamos un carrito con 0 productos.
        const data = await cartsModel.add({productos: []});
        //Editamos el valor currentCart del user que lo creo.
        await usersModel.updateOne(userId, {currentCart: data._id});
        //Devolvemos al cliente el id de carrito creado.
        return data._id;
    } catch (error) {
        throw error;
    }
};

const addProduct = async (idCart, idProd, quantity)=>{

    try {
        //Se accede al atributo ._doc ya que mongo devuelve un objeto con mucha info de mas.. y la data necesaria esta en el ._doc
        const product = (await productsModel.getById(idProd))._doc;
        if (!product) throw {message: `no product with ID: ${idProd}`, status: 404};
        const cart = await cartsModel.getById(idCart);
        if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
        const ArrayProducts = cart?.productos;
        const prodInCart = ArrayProducts.find(prod => prod._id == idProd);

        quantity = Number(quantity);
        if (quantity == 0) throw {message: "Debes agregar al menos 1 unidad", status: 400};

        if (!prodInCart){
            product.quantity = quantity;
            if (quantity > product.stock) throw {message: `Stock insuficiente: solo quedan ${product.stock} unidades`, status: 400};
            ArrayProducts.push(product);
        }else{
            const newQuantity = prodInCart.quantity + quantity;
            if (newQuantity > product.stock) throw {message: `Stock insuficiente: solo puedes agregar ${product.stock - prodInCart.quantity} unidades mas`, status: 400};
            prodInCart.quantity = newQuantity;
            ArrayProducts.map(prod =>{
                if (prod._id == idProd) return prodInCart;
                return prod;
            })
        }

        await cartsModel.updateOne(idCart, {productos: ArrayProducts});  

    } catch (error) {
        throw error;
    }
};

const deleteById = async (idCart, idUser)=>{
    try {
        await cartsModel.deleteById(idCart);
        //Editamos el valor currentCart del user que lo borro.
        await usersModel.updateOne(idUser, {currentCart: ""});
    } catch (error) {
        throw error;
    }
};

const deleteProductById = async (idCart, idProd)=>{
    try {
        const cart = await cartsModel.getById(idCart);
        if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
        const productos = cart.productos.filter(prod => prod._id != idProd);
        await cartsModel.updateOne(idCart, {productos});
    } catch (error) {
        throw error;
    }
};



export default {
    getProducts,
    createCart,
    addProduct,
    deleteById,
    deleteProductById
}