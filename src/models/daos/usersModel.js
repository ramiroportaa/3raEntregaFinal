//CAMBIAR PARA QUE FUNCIONE COMO DAO CON EL CONTENEDOR DE MONGO!!

import __dirname from "../../utils.js";
import mongoose from "mongoose";

//Clase contenedora de MongoDB para usuarios.
class usersModel {
    constructor(collectionName){
        const userSchema = mongoose.Schema({ 
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
        });
        this.model = mongoose.model(collectionName, userSchema);
    }

    async createUser(data){
        try {
            const user = await this.model.create(data);
            return user;
        } catch (error) {
            console.log("error al crear usuario: ", error);
        }
    }

    async getById(id){
        try {
            const data = await this.model.findOne({_id: id});
            return data; 
        } catch (error) {
            console.log("error al obtener user por ID", error);
        }
    }

    async getByEmail(email){
        try {
            const data = await this.model.findOne({email});
            return data; 
        } catch (error) {
            console.log("error al obtener user por EMAIL", error);
        }
    }

    async editById(id, NewDataObj){
        try {
            await this.model.updateOne({_id: id}, {$set: NewDataObj});
        } catch (error) {
            console.log(`error in updating user: ${error}`);
            return {error: {message: `error in updating user`, status: 500}};
        }
    }

}

export default new usersModel('user');