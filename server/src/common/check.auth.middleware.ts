import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../types";
import {inject, injectable} from "inversify";
import {IUsersService} from "../users/users.service.interface";
import {get} from "lodash";
@injectable()
export class CheckAuthMiddleware implements IMiddleware {
    constructor(@inject(TYPES.IUsersService) private userService: IUsersService) {

    }
    async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('Check auth middleware');
        if(req.isAuthenticated()) {
            console.log('Next');
            req.body.email = get(req, 'user.email');
            req.body.userAuth = await this.userService.getInfoUser(req.body.email);
            next();
        } else {
            console.log('Not auth');
            next();
        }
    }

}