import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response, Router} from "express";

export interface IMainPageController {
    router: Router;
    bindRoutes(routes: IControllerRoute[]): void;
    mainPageFunc (req: Request, res: Response, next: NextFunction): void;
}