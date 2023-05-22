import {NextFunction, Request, Response, Router} from "express";
import {IControllerRoute} from "../../common/route.interface";

export interface ISearchPageController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    searchItem: (req: Request, res: Response, next: NextFunction)=> void;
    getItemPages: (req: Request, res: Response, next: NextFunction)=> void;
}