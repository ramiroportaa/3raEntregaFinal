import mongoose from "mongoose";
import config from "../../config.js";
import logger from "../../services/logger.js";

mongoose.connect(config.URLMongo, (err, res)=>{
    if (err) throw err;
    return logger.info("Base de datos conectada.");
})

export class ContenedorMongo {
    constructor(collectionName, schema){
        this.collection = collectionName;
        this.model = mongoose.model(collectionName, mongoose.Schema(schema));
    }
    async getAll(){
        try {
            const data = await this.model.find();
            return {data};
        } catch (error) {
            logger.warn(`error in getting ${this.collection}: ${error}`);
            return {error: {message: `error in getting ${this.collection}`, status: 500}};
        }
    }
    async getById(id){
        try {
            const data = await this.model.findOne({_id: id});
            if (data) return {data};
            return {error: {message: `no ${this.collection} with ID: ${id}`, status: 404}};
        } catch (error) {
            logger.warn(`error in getting ${this.collection}: ${error}`);
            return {error: {message: `error in getting ${this.collection}`, status: 500}};
        }
    }
    async add(data){
        try {
            data.timestamp = Date.now();
            const res = await this.model.create(data);
            return res;
        } catch (error) {
            logger.warn(`error in adding ${this.collection}: ${error}`);
            return {error: {message: `error in adding ${this.collection}`, status: 500}};
        }
    }
    async updateOne(id, NewDataObj){
        try {
            await this.model.updateOne({_id: id}, {$set: NewDataObj});
        } catch (error) {
            logger.warn(`error in updating ${this.collection}: ${error}`);
            return {error: {message: `error in updating ${this.collection}`, status: 500}};
        }
    }
    async deleteById(id){
        try {
            await this.model.deleteOne({_id: id});
        } catch (error) {
            logger.warn(`error in deleting ${this.collection}: ${error}`);
            return {error: {message: `error in deleting ${this.collection}`, status: 500}};
        }
    }
}