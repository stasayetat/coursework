import {Mongoose} from "mongoose";

export interface IMongooseService {
    mongoose: Mongoose;
    connect: ()=> Promise<void>;
    close: ()=> Promise<void>;
}