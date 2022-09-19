import { ContenedorMongo } from "../contenedores/ContenedorMongo.js";

class UsersModel extends ContenedorMongo {
    constructor(){
        super("user", { 
            email: {type: String, require: true, unique: true},
            password: {type: String, require: true},
            role: {type: String, default: "user"},
            firstName: {type: String, require: true},
            lastName: {type: String, require: true},
            address: {type: String, require: true},
            age: {type: Number, require: true},
            tel: {type: Number, require: true},
            avatar: {type: String, require: true},
            currentCart: {type: String, default: ""}
        })
    }

    async getByEmail(email){
        try {
            const data = await this.model.findOne({email});
            return data; 
        } catch (error) {
            console.log("error al obtener user por EMAIL", error);
        }
    }
}

export default new UsersModel();