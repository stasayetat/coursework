import {IUsersRepository} from "./users.repository.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {User} from "./user.entity";
import {Model, Schema} from "mongoose";
import {TYPES} from "../types";
import {IMongooseService} from "../database/mongoose.service.interface";
@injectable()
export class UsersRepository implements IUsersRepository{

    private userSchema = new Schema({
        email: {type: String, required: true},
        password: {type: String, required: true},
        name: {type: String, required: false},
        surname: {type: String, required: false}
    });

    private readonly dataUser: Model<any>;

    constructor(@inject(TYPES.IMongooseService) private mongooseService: IMongooseService) {
        this.dataUser = this.mongooseService.mongoose.model('User', this.userSchema);
    }
    async create(user: User): Promise<User | null> {
        console.log(`Create function in users repository here`);
        const newUser = new this.dataUser({
            email: user.email,
            password: user.password
        });
        return this.dataUser.create(newUser);
    }

    async find(email: string): Promise<User | null> {
        return this.dataUser.findOne({email});
    }

    async update(user: User): Promise<User | null> {
        return this.dataUser.findOneAndUpdate(
            {
                email: user.email
            },{
                name: user.name,
                surname: user.surname,
                password: user.password
            }
        );
    }

    findById(userId: number): Promise<User | null> {
        return this.dataUser.findById(userId);
    }

}