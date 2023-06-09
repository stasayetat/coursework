"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../../types");
let ReviewController = class ReviewController extends base_controller_1.BaseController {
    constructor(reviewService) {
        super();
        this.reviewService = reviewService;
        this.reviewsPage = [
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
        this.bindRoutes(this.reviewsPage);
    }
    async addReview(req, res, next) {
        const formData = req.body;
        console.log(`Request body is ${formData.userName} rates ${formData.itemTitle} for ${formData.rate}`);
        const reviewedItem = await this.reviewService.createReview(formData);
    }
    getAllReviews(req, res, next) {
    }
};
ReviewController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IReviewService)),
    __metadata("design:paramtypes", [Object])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map