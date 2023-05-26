import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response, Router} from "express";

export interface IProductPageController {
    router: Router;
    bindRoutes(routes: IControllerRoute[]): void;
    productPageFunc(req: Request, res: Response, next: NextFunction): Promise<void>;
}