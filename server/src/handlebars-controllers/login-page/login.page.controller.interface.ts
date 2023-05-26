import {NextFunction, Request, Response, Router} from "express";
import {IControllerRoute} from "../../common/route.interface";

export interface ILoginPageController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    loginPage: (req: Request, res: Response, next: NextFunction)=> void;
    loginPageFailed: (req: Request, res: Response, next: NextFunction)=> void;
    // login: (req: Request, res: Response, next: NextFunction)=> void;
}