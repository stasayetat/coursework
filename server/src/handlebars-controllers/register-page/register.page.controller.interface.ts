import {NextFunction, Request, Response, Router} from "express";
import {IControllerRoute} from "../../common/route.interface";

export interface IRegisterPageController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    registerPage: (req: Request, res: Response, next: NextFunction)=> void;
    register: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
}
