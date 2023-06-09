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
exports.RegisterPageController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const user_register_dto_1 = require("../../users/dto/user.register.dto");
const types_1 = require("../../types");
const validate_middleware_1 = require("../../common/validate.middleware");
let RegisterPageController = class RegisterPageController extends base_controller_1.BaseController {
    constructor(usersService) {
        super();
        this.usersService = usersService;
        this.registerPageMethods = [
            {
                path: '/',
                func: this.registerPage,
                method: 'get'
            },
            {
                path: '/',
                func: this.register,
                method: 'post',
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)]
            }
        ];
        this.bindRoutes(this.registerPageMethods);
    }
    registerPage(req, res, next) {
        res.render('register.ejs');
    }
    async register(req, res, next) {
        console.log(`Register page here ${req.body.email} = ${req.body.password}`);
        const result = await this.usersService.createUser(req.body);
        if (result) {
            console.log('Register success');
            res.redirect('/login');
        }
        else {
            console.log('Register failed');
            res.send({ error: 'Email already registered' });
        }
    }
};
RegisterPageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __metadata("design:paramtypes", [Object])
], RegisterPageController);
exports.RegisterPageController = RegisterPageController;
//# sourceMappingURL=register.page.controller.js.map