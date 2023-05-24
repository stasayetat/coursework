import {UserRegisterDto} from "./dto/user.register.dto";
import {UserLoginDto} from "./dto/user.login.dto";
import {User} from "./user.entity";
import {UserUpdateInfoDto} from "./dto/user.update.info.dto";

export interface IUsersService {
    createUser: (userDto: UserRegisterDto)=> Promise<User | null>;
    validateUser: (userDto: UserLoginDto)=> Promise<boolean>;
    getInfoUser: (email: string)=> Promise<User | null>;
    getInfoUserById: (id: number)=> Promise<User | null>;
    updateUserInformation: (userDto: UserUpdateInfoDto)=> Promise<User | null>;
}