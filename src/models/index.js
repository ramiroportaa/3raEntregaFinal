import {config} from "dotenv";
config();

const DATABASE = process.env.DATABASE;
let cartsModel;
let productsModel;

switch (DATABASE) {
    case "mongoDB":
        const { default: cartsModelDaoMongo } = await import("./daos/cartsModel-mongoDB.js");
        const { default: productsModelDaoMongo } = await import("./daos/productsModel-mongoDB.js");

        cartsModel = cartsModelDaoMongo;
        productsModel = productsModelDaoMongo;

        break;

    case "firebase":
        const { default: cartsModelDaoFirebase } = await import("./daos/cartsModel-firebase.js");
        const { default: productsModelDaoFirebase } = await import("./daos/productsModel-firebase.js");

        cartsModel = cartsModelDaoFirebase;
        productsModel = productsModelDaoFirebase;

        break;
        
    default:
        break;
}

export {
    cartsModel,
    productsModel
}