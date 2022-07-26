import {productsModel} from "../models/index.js";

const getAll = async (req, res)=>{
    const products = await productsModel.getAll();
    if (products?.error) return res.status(products.error.status).json(products.error.message);
    res.status(200).json(products);
};

const getById = async (req, res)=>{
    const id = req.params.id;
    const product = await productsModel.getById(id);
    if (product?.error) return res.status(product.error.status).json(product.error.message);
    res.status(200).json(product);
};

const add = async (req, res)=>{
    const product = req.body;
    const data = await productsModel.add(product);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
};

const updateById = async (req, res)=>{
    const id = req.params.id;
    let product = {}
    const prodArray = Object.entries(req.body);
    prodArray.forEach(entries =>{
        if (entries[1]){
            product[entries[0]] = entries[1];
        }
    })
    const data = await productsModel.updateOne(id, product);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

const deleteById = async (req, res)=>{
    const id = req.params.id;
    const data = await productsModel.deleteById(id);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById
}