import {BaseController} from "../../common/base.controller";
import {IRegisterPageController} from "./register.page.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {UserRegisterDto} from "../../users/dto/user.register.dto";
import {User} from "../../users/user.entity";
import {IUsersService} from "../../users/users.service.interface";
import {TYPES} from "../../types";
import {ValidateMiddleware} from "../../common/validate.middleware";
@injectable()
export class RegisterPageController extends BaseController implements IRegisterPageController{
    private registerPageMethods: IControllerRoute[] = [
        {
            path: '/',
            func: this.registerPage,
            method: 'get'
        },
        {
            path: '/',
            func: this.register,
            method: 'post',
            middlewares: [new ValidateMiddleware(UserRegisterDto)]
        }
    ];

    constructor(@inject(TYPES.IUsersService) private usersService: IUsersService) {
        super();
        this.bindRoutes(this.registerPageMethods);
    }

    public registerPage(req: Request, res: Response, next: NextFunction): void {
        res.render('register.ejs');
    }

    public async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        console.log(`Register page here ${req.body.email} = ${req.body.password}` );
        const result = await this.usersService.createUser(req.body);
        if(result) {
            console.log('Register success');
            res.redirect('/login');
        }
        else {
            console.log('Register failed');
            res.json({error: 'Email already registered'});
        }

    }
}
