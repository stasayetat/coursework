import {BaseController} from "../../common/base.controller";
import {ILoginPageController} from "./login.page.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {UserLoginDto} from "../../users/dto/user.login.dto";
import {ValidateMiddleware} from "../../common/validate.middleware";
import passport from "passport";
import {TYPES} from "../../types";
import {CheckAuthMiddleware} from "../../common/check.auth.middleware";
@injectable()
export class LoginPageController extends BaseController implements ILoginPageController {
    private loginPageMethods: IControllerRoute[] = [
        {
            path: '/',
            func: this.loginPage,
            method: 'get',
        },

        {
            path: '/failed',
            func: this.loginPageFailed,
            method: 'get',
        },

        {
            path: '/',
            func: passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login/failed',
            }),
            method: 'post',
        }
    ];

    constructor(@inject(TYPES.CheckAuthMiddleware) private checkAuthMiddleware: CheckAuthMiddleware) {
        super();
        this.bindRoutes(this.loginPageMethods);
    }

    public loginPage(req: Request, res: Response, next: NextFunction): void {
        res.render('login');
    }

    public loginPageFailed(req: Request, res: Response, next: NextFunction): void {
        console.log('Wrong email or password');
        res.render('login', {
            failed: 'Wrong email or password'
        });
    }

    // public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    //
    // }
}