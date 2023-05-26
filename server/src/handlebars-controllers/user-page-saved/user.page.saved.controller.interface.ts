import {Router} from "express";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
export interface IUserPageSavedController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    userPageSaved: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    updateSavedItems: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    addSavedItem: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
}