import {Router} from "express";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";

export interface IOrderPageController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    orderPage: (req: Request, res: Response, next: NextFunction)=> void;
    saveOrder: (req: Request, res: Response, next: NextFunction)=> void;
    orderListRefresh: (req: Request, res: Response, next: NextFunction)=> void;
}