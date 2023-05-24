import {BaseController} from "../../common/base.controller";
import {ILoginPageController} from "./login.page.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {injectable} from "inversify";
import 'reflect-metadata';
import {UserLoginDto} from "../../users/dto/user.login.dto";
import {ValidateMiddleware} from "../../common/validate.middleware";
import passport from "passport";
@injectable()
export class LoginPageController extends BaseController implements ILoginPageController {
    private loginPageMethods: IControllerRoute[] = [
        {
            path: '/',
            func: this.loginPage,
            method: 'get'
        },

        {
            path: '/',
            func: passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login'
            }),            // func: this.login,
            method: 'post',
            // middlewares: [new ValidateMiddleware(UserLoginDto)]
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.loginPageMethods);
    }

    public loginPage(req: Request, res: Response, next: NextFunction): void {
        res.render('login');
    }

    // public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    //
    // }
}