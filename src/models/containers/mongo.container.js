import mongoose from "mongoose";
import config from "../../config.js";
import logger from "../../utils/logger.js";

mongoose.connect(config.URLMongo, (err, res)=>{
    if (err) throw err;
    return logger.info("Base de datos conectada.");
})

export class MongoContainer {
    constructor(collectionName, schema){
        this.collection = collectionName;
        this.model = mongoose.model(collectionName, mongoose.Schema(schema));
    }
    async getAll(){
        try {
            const data = await this.model.find();
            return data;
        } catch (error) {
            logger.warn(`Mongo model container: error in getting all ${this.collection}s: ${error}`);
            throw {message: `error in getting ${this.collection}s`, status: 500};
        }
    }
    async getById(id){
        try {
            const data = await this.model.findOne({_id: id});
            //Se accede al atributo ._doc ya que mongo devuelve un objeto con mucha info de mas.. y la data necesaria esta en el ._doc
            return data?._doc;
        } catch (error) {
            logger.warn(`Mongo model container: error in getting ${this.collection} by id: ${error}`);
            throw {message: `error in getting ${this.collection}`, status: 500};
        }
    }
    async add(data){
        try {
            data.timestamp = Date.now();
            const res = await this.model.create(data);
            return res;
        } catch (error) {
            logger.warn(`Mongo model container: error in adding ${this.collection}: ${error}`);
            throw {message: `error in adding ${this.collection}`, status: 500};
        }
    }
    async updateOne(id, NewDataObj){
        try {
            await this.model.updateOne({_id: id}, {$set: NewDataObj});
        } catch (error) {
            logger.warn(`Mongo model container: error in updating ${this.collection}: ${error}`);
            throw {message: `error in updating ${this.collection}`, status: 500};
        }
    }
    async deleteById(id){
        try {
            await this.model.deleteOne({_id: id});
        } catch (error) {
            logger.warn(`Mongo model container: error in deleting ${this.collection}: ${error}`);
            throw {message: `error in deleting ${this.collection}`, status: 500};
        }
    }
}