import {BaseController} from "../../common/base.controller";
import {IReviewController} from "./review.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../../types";
import {IItemController} from "../item.controller.interface";
import {IItemsRepository} from "../items.repository.interface";
import {ReviewDto} from "./dto/review.dto";
import {IReviewService} from "./review.service.interface";
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

    constructor(@inject(TYPES.IReviewService) private reviewService: IReviewService) {
        super();
        this.bindRoutes(this.reviewsPage);
    }

    public async addReview(req: Request<{}, {}, ReviewDto>, res: Response, next: NextFunction): Promise<void> {
        const formData = req.body;
        console.log(`Request body is ${formData.userName} rates ${formData.itemTitle} for ${formData.rate}`);
        const reviewedItem = await this.reviewService.createReview(formData);

    }

    public getAllReviews(req: Request, res: Response, next: NextFunction): void {

    }

}