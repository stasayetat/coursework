import {NextFunction, Request, Response, Router} from "express";
import {IControllerRoute} from "../../common/route.interface";

export interface IUserPageOrdersController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    userPageOrders: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    updateOrderStatus: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
}