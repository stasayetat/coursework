import {injectable} from "inversify";
import 'reflect-metadata';
import {MongoClient} from "mongodb";
import {Mongoose} from "mongoose";
import {IMongooseService} from "./mongoose.service.interface";
@injectable()
export class MongooseService implements IMongooseService{
    mongoClient: MongoClient;
    mongoose: Mongoose;
    constructor() {
        this.mongoose = new Mongoose();
    }

    public async connect() {
        if(process.env.DBURL !== undefined)
            await this.mongoose.connect(process.env.DBURL.concat('coursework') as string);
        else {
            console.log("Connected failed");
        }
        console.log("Connected success");
    }

    public async close() {
        await this.mongoClient.close();
        console.log("Connected closed");
    }
}