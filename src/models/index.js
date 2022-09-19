import config from "../config.js";

let cartsModel;
let productsModel;
let usersModel;

switch (config.DATABASE) {
    case "mongoDB":
        const { default: cartsModelDaoMongo } = await import("./daos/cartsModel-mongoDB.js");
        const { default: productsModelDaoMongo } = await import("./daos/productsModel-mongoDB.js");
        const { default: usersModelDaoMongo } = await import("./daos/usersModel-mongoDB.js");

        cartsModel = cartsModelDaoMongo;
        productsModel = productsModelDaoMongo;
        usersModel = usersModelDaoMongo;

        break;

    case "firebase":
        const { default: cartsModelDaoFirebase } = await import("./daos/cartsModel-firebase.js");
        const { default: productsModelDaoFirebase } = await import("./daos/productsModel-firebase.js");
        const { default: usersModelDaoFirebase } = await import("./daos/usersModel-mongoDB.js");

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