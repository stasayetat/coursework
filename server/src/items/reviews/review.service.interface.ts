import {ReviewDto} from "./dto/review.dto";
import {Item} from "../item.entity";

export interface IReviewService {
    createReview: (review: ReviewDto)=> Promise<Item | null>;
}