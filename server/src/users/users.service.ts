import {IUsersService} from "./users.service.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {TYPES} from "../types";
import {IUsersRepository} from "./users.repository.interface";
import {UserRegisterDto} from "./dto/user.register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user.login.dto";
import {compare} from "bcryptjs";
import {UserUpdateInfoDto} from "./dto/user.update.info.dto";
@injectable()
export class UsersService implements IUsersService {
    constructor(@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository) {
    }

    async createUser(userDto: UserRegisterDto): Promise<User | null> {
        console.log(`CreateUser in users.service here userDTO is ${userDto.email} - ${userDto.password}`);
        const newUser = new User(userDto.email);
        await newUser.setPassword(userDto.password, 10);
        const existedUser = await this.usersRepository.find(userDto.email);
        if(existedUser) {
            return null;
        } else {
            return this.usersRepository.create(newUser);
        }
    }

    async getInfoUser(email: string): Promise<User | null> {
        return this.usersRepository.find(email);
    }

    async validateUser(userDto: UserLoginDto): Promise<boolean> {
        const loginUser = await this.usersRepository.find(userDto.email);
        if(!loginUser){
            console.log('User not find');
            return false;
        } else {
            console.log(`Pass - ${userDto.password}`);
            const res = await compare(userDto.password, loginUser.password);
            if(res) {
                console.log('All is good');
                return true;
            } else {
                console.log('Bad password');
                return false;
            }
        }
    }

    async getInfoUserById(id: number): Promise<User | null> {
        return this.usersRepository.findById(id);
    }

    async updateUserInformation(userDto: UserUpdateInfoDto): Promise<User | null> {
        const updatedUser = new User(userDto.email);
        updatedUser.name = userDto?.name;
        updatedUser.surname = userDto?.surname;
        if(userDto.newPassword) {
            await updatedUser.setPassword(userDto.newPassword, 10);
        } else {
            await updatedUser.setPassword(userDto.prevPassword, 10);
        }
        console.log(JSON.stringify(updatedUser));
        return this.usersRepository.update(updatedUser);
    }


}