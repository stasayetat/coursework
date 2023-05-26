import {IReviewService} from "./review.service.interface";
import {ReviewDto} from "./dto/review.dto";
import {Review} from "./review.entity";
import {TYPES} from "../../types";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IItemsRepository} from "../items.repository.interface";
import {Item} from "../item.entity";
@injectable()
export class ReviewService implements IReviewService {

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository) {

    }
    async createReview(review: ReviewDto): Promise<Item | null> {
        const newReview = new Review(review.rate, review.bigComment, review.advantages, review.minuses, review.userName);
        console.log(`newReview comment is ${newReview.bigComment}`);
        return this.itemsRepository.addReviewToItems(newReview, review.itemTitle);
    }

}