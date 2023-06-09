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
exports.UserPageSavedController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const auth_middleware_1 = require("../../common/auth.middleware");
const lodash_1 = require("lodash");
const types_1 = require("../../types");
let UserPageSavedController = class UserPageSavedController extends base_controller_1.BaseController {
    constructor(userPageSavedService, usersRepository, usersService) {
        super();
        this.userPageSavedService = userPageSavedService;
        this.usersRepository = usersRepository;
        this.usersService = usersService;
        this.userPageSavedMethods = [
            {
                path: '/saved',
                func: this.userPageSaved,
                method: 'get',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            },
            {
                path: '/saved/refresh',
                func: this.updateSavedItems,
                method: 'get',
            },
            {
                path: '/saved/add',
                func: this.addSavedItem,
                method: 'post',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            },
        ];
        this.bindRoutes(this.userPageSavedMethods);
    }
    async userPageSaved(req, res, next) {
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        const savedItems = await this.userPageSavedService.getSavedItems(req.body.email);
        let authUser = await this.usersService.getInfoUser(req.body.email);
        res.render('user-page-saved.ejs', {
            savedItems: savedItems,
            email: authUser?.email,
            cartItems: authUser?.cartItems.length
        });
    }
    async updateSavedItems(req, res, next) {
    }
    async addSavedItem(req, res, next) {
        console.log(`Request ${(0, lodash_1.get)(req, 'user.email')} on ${req.body.params.name}`);
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        const result = await this.userPageSavedService.addItemToSaved(req.body.email, req.body.params.name);
        console.log("Add item success");
        res.send(req.body.params.name);
        return;
    }
};
UserPageSavedController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUserPageSavedService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUsersRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserPageSavedController);
exports.UserPageSavedController = UserPageSavedController;
//# sourceMappingURL=user.page.saved.controller.js.map