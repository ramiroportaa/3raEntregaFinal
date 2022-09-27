import {productsModel} from "../models/index.js";

const getAll = async () => {
    try {
        const products = await productsModel.getAll();
        return products;
    } catch (error) {
        throw error;
    }
};

const getById = async (idProd)=>{
    try {
        const product = await productsModel.getById(idProd);
        if (!product) throw {message: `no product with ID: ${idProd}`, status: 404};
        return product;
    } catch (error) {
        throw error;
    }
};

const add = async (product)=>{
    try {
        const data = await productsModel.add(product);
        return data;
    } catch (error) {
        throw error;
    }
};

const updateById = async (idProd, newDataObj)=>{
    try {
        let product = {};
        const prodArray = Object.entries(newDataObj);
        prodArray.forEach(entries =>{
            if (entries[1]){
                product[entries[0]] = entries[1];
            }
        })
        await productsModel.updateOne(idProd, product);
    } catch (error) {
        throw error;
    }
};

const deleteById = async (idProd)=>{
    try {
        await productsModel.deleteById(idProd);
    } catch (error) {
        throw error;
    }
};

export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById
}