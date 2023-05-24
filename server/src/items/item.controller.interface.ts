import {Router} from "express";
import {IControllerRoute} from "../common/route.interface";
import {NextFunction, Request, Response} from "express";
export interface IItemController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    createItem: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    deleteItem: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    findItems: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
}