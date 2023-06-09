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
exports.UserPageController = void 0;
const base_controller_1 = require("../../common/base.controller");
const auth_middleware_1 = require("../../common/auth.middleware");
const lodash_1 = require("lodash");
const validate_middleware_1 = require("../../common/validate.middleware");
const user_update_info_dto_1 = require("../../users/dto/user.update.info.dto");
const types_1 = require("../../types");
const inversify_1 = require("inversify");
const user_login_dto_1 = require("../../users/dto/user.login.dto");
let UserPageController = class UserPageController extends base_controller_1.BaseController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.userPageMethods = [
            {
                path: '/',
                func: this.userPageFunc,
                method: 'get',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            },
            {
                path: '/',
                func: this.editUserData,
                method: 'post',
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_update_info_dto_1.UserUpdateInfoDto)]
            },
            {
                path: '/logout',
                func: this.userLogout,
                method: 'get'
            }
        ];
        this.bindRoutes(this.userPageMethods);
    }
    async userPageFunc(req, res, next) {
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        let authUser = await this.userService.getInfoUser(req.body.email);
        console.log('User-page render');
        res.render('user-page', {
            surname: (0, lodash_1.get)(req, 'user.surname'),
            name: (0, lodash_1.get)(req, 'user.name'),
            email: (0, lodash_1.get)(req, 'user.email'),
            cartItems: authUser?.cartItems.length
        });
    }
    async editUserData(req, res, next) {
        console.log(`Email is ${req.body.email} - ${req.body.prevPassword} : ${req.body.newPassword}`);
        if (await this.userService.validateUser(new user_login_dto_1.UserLoginDto(req.body.email, req.body.prevPassword))) {
            await this.userService.updateUserInformation(req.body);
            res.redirect('/users');
        }
        else {
            res.json({ error: 'Bad password' });
        }
    }
    userLogout(req, res, next) {
        req.logOut(() => { });
        res.redirect('/login');
    }
};
UserPageController = __decorate([
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __metadata("design:paramtypes", [Object])
], UserPageController);
exports.UserPageController = UserPageController;
//# sourceMappingURL=user.page.controller.js.map