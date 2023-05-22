import {BaseController} from "../../common/base.controller";
import {IReviewController} from "./review.controller.interface";
import {injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
@injectable()
export class ReviewController extends BaseController implements IReviewController {
    private reviewsPage: IControllerRoute[] = [
        {
            path: '/add',
            func: this.addReview,
            method: 'post'
        },
        {
            path: '/getAdd',
            func: this.getAllReviews,
            method: 'get'
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.reviewsPage);
    }

    public addReview(req: Request, res: Response, next: NextFunction): void {
        const formData = req.body;
        console.log(`Request body is ${formData.name} rates ${formData.itemTitle} for ${formData.rateStar}`);
    }

    public getAllReviews(req: Request, res: Response, next: NextFunction): void {

    }

}