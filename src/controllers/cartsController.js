import {productsModel} from "../models/index.js";
import {cartsModel} from "../models/index.js";
import usersModel from "../models/daos/usersModel.js";

const getProducts = async (req, res)=>{
    const idCart = req.params.id;
    const data = await cartsModel.getById(idCart);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(200).json({products: data.data.productos});
};

const createCart = async (req, res)=>{
    //Creamos un carrito con 0 productos.
    const data = await cartsModel.add({productos: []});
    if (data?.error) return res.status(data.error.status).json(data.error.message);

    //Editamos el valor currentCart del user que lo creo.
    const edit = await usersModel.editById(req.user._id, {currentCart: data._id});
    if (edit?.error) return res.status(data.error.status).json(data.error.message);

    //Devolvemos al cliente el id de carrito creado.
    res.status(201).json({ idCart: data._id });
};

const addProduct = async (req, res)=>{
    const idCart = req.params.id;
    const idProd = req.body.idProd;
    const product = await productsModel.getById(idProd);
    if (product?.error) return res.status(product.error.status).json(product.error.message);

    const cart = await cartsModel.getById(idCart);
    const productos = cart?.data?.productos;
    const prodInCart = productos?.find(prod => prod.data._id == idProd);

    if (!prodInCart){
        product.quantity = Number(req.body.quantity);
        if (product.quantity == 0) return res.status(400).json(`Debes agregar al menos 1 unidad`);
        if (product.quantity > product.data.stock) return res.status(400).json(`Stock insuficiente: solo quedan ${product.data.stock} unidades`);
        productos.push(product);
        const data = await cartsModel.updateOne(idCart, {productos});
        if (data?.error) return res.status(data.error.status).json(data.error.message);
        res.sendStatus(204);
    }else{
        const newQuantity = prodInCart.quantity + Number(req.body.quantity);
        if (newQuantity > product.data.stock) return res.status(400).json(`Stock insuficiente: solo puedes agregar ${product.data.stock - prodInCart.quantity} unidades mas`);
        prodInCart.quantity = newQuantity;
        productos.map(prod =>{
            if (prod.data._id == idProd) return prodInCart
            return prod
        })
        const data = await cartsModel.updateOne(idCart, {productos});
        if (data?.error) return res.status(data.error.status).json(data.error.message);
        res.sendStatus(204);
    }
};

const deleteById = async (req, res)=>{
    const idCart = req.params.id;
    let data = await cartsModel.deleteById(idCart);
    if (data?.error) return res.status(data.error.status).json(data.error.message);

    //Editamos el valor currentCart del user que lo borro.
    data = await usersModel.editById(req.user._id, {currentCart: ""});
    if (data?.error) return res.status(data.error.status).json(data.error.message);

    res.sendStatus(204);
};

const deleteProductById = async (req, res)=>{
    const idCart = req.params.id;
    const idProd = req.params.id_prod;

    const cart = await cartsModel.getById(idCart);
    const productos = cart.data.productos.filter(prod => prod.data._id != idProd);
    const data = await cartsModel.updateOne(idCart, {productos});

    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

const getCurrentCartId = async (req, res)=>{
    const idCart = req.user.currentCart;
    res.status(200).json({idCart});
};

export default {
    getProducts,
    createCart,
    addProduct,
    deleteById,
    deleteProductById,
    getCurrentCartId
}