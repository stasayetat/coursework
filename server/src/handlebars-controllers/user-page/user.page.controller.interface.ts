import {Router} from "express";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
export interface IUserPageController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    userPageFunc: (req: Request, res: Response, next: NextFunction)=> void;
    editUserData: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    userLogout: (req: Request, res: Response, next: NextFunction)=> void;
}