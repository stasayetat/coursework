import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response, Router} from "express";

export interface IReviewController {
    router: Router;
    bindRoutes: (routes: IControllerRoute[])=> void;
    addReview: (req: Request, res: Response, next: NextFunction)=> Promise<void>;
    getAllReviews: (req: Request, res: Response, next: NextFunction)=> void;
}