import config from "../config.js";

let cartsModel;
let productsModel;
let usersModel;

switch (config.DATABASE) {
    case "mongoDB":
        const { default: cartsModelDaoMongo } = await import("./daos/cartsModel.DAO.mongo.js");
        const { default: productsModelDaoMongo } = await import("./daos/productsModel.DAO.mongo.js");
        const { default: usersModelDaoMongo } = await import("./daos/usersModel.DAO.mongo.js");

        cartsModel = cartsModelDaoMongo;
        productsModel = productsModelDaoMongo;
        usersModel = usersModelDaoMongo;

        break;

    case "firebase":
        const { default: cartsModelDaoFirebase } = await import("./daos/cartsModel.DAO.firebase.js");
        const { default: productsModelDaoFirebase } = await import("./daos/productsModel.DAO.firebase.js");
        const { default: usersModelDaoFirebase } = await import("./daos/usersModel.DAO.mongo.js");

        cartsModel = cartsModelDaoFirebase;
        productsModel = productsModelDaoFirebase;
        usersModel = usersModelDaoFirebase;

        break;
        
    default:
        break;
}

export {
    cartsModel,
    productsModel,
    usersModel
}