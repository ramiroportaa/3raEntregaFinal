import CartsDAOmongo from "./daos/cartsModel.DAO.mongo.js";
import CartsDAOfirebase from "./daos/cartsModel.DAO.firebase.js";
import ProductsDAOmongo from "./daos/productsModel.DAO.mongo.js";
import ProductsDAOfirebase from "./daos/productsModel.DAO.firebase.js";
import UsersDAOmongo from "./daos/usersModel.DAO.mongo.js";

class DAOFactory {
  static createDao(name, database) {
    if (database == "mongoDB") {
      switch (name) {
        case "product": return ProductsDAOmongo.getInstance();
        case "cart": return CartsDAOmongo.getInstance();
        case "user": return UsersDAOmongo.getInstance();
        default:
          throw {
            message: `Error in DAOFactory, ${name} DAO not exist`,
            status: 500,
          };
      }
    } else if (database == "firebase") {
      switch (name) {
        case "product": return ProductsDAOfirebase.getInstance();
        case "cart": return CartsDAOfirebase.getInstance();
        case "user": return UsersDAOmongo.getInstance();
        default:
          throw {
            message: `Error in DAOFactory, ${name} DAO not exist`,
            status: 500,
          };
      }
    }else{
      throw {
        message: `Error in DAOFactory, ${database} not exist`,
        status: 500,
      };
    }
  }
}

export default DAOFactory;
