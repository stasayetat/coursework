"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const path = __importStar(require("path"));
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const passport_config_1 = require("./passport-config");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
let App = class App {
    constructor(mainPageController, productPageController, reviewController, searchPageController, registerPageController, loginPageController, mongooseService, usersService, userPageController, userPageOrdersController, userPageSavedController, orderPageController, itemController) {
        this.mainPageController = mainPageController;
        this.productPageController = productPageController;
        this.reviewController = reviewController;
        this.searchPageController = searchPageController;
        this.registerPageController = registerPageController;
        this.loginPageController = loginPageController;
        this.mongooseService = mongooseService;
        this.usersService = usersService;
        this.userPageController = userPageController;
        this.userPageOrdersController = userPageOrdersController;
        this.userPageSavedController = userPageSavedController;
        this.orderPageController = orderPageController;
        this.itemController = itemController;
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || 3000;
    }
    useEJS() {
        const projectFolderPath = path.resolve(__dirname, '..', '..');
        const clientFolderPath = path.join(projectFolderPath, 'client');
        const publicFolderPath = path.join(clientFolderPath, 'public');
        this.app.use(express_1.default.static(publicFolderPath));
        this.app.set('view engine', 'ejs');
    }
    useMiddlewares() {
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use('/', this.mainPageController.router);
        this.app.use('/product', this.productPageController.router);
        this.app.use('/reviews', this.reviewController.router);
        this.app.use('/search', this.searchPageController.router);
        this.app.use('/register', this.registerPageController.router);
        this.app.use('/login', this.loginPageController.router);
        this.app.use('/users', this.userPageController.router);
        this.app.use('/users', this.userPageController.router);
        this.app.use('/users', this.userPageOrdersController.router);
        this.app.use('/users', this.userPageSavedController.router);
        this.app.use('/orders', this.orderPageController.router);
        this.app.use('/items', this.itemController.router);
    }
    usePassportConfig() {
        (0, passport_config_1.initializePassport)(passport_1.default, async (email) => {
            return this.usersService.getInfoUser(email);
        }, async (id) => {
            return this.usersService.getInfoUserById(id);
        });
    }
    async init() {
        (0, dotenv_1.config)();
        this.useEJS();
        this.useMiddlewares();
        this.usePassportConfig();
        console.log("Connecting to database...");
        await this.mongooseService.connect();
        this.app.listen(this.PORT, () => {
            console.log(`Server started on ${this.PORT} port`);
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMainPageController)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IProductPageController)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IReviewController)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ISearchPageController)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.IRegisterPageController)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.ILoginPageController)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.IMongooseService)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.IUserPageController)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.IUserPageOrdersController)),
    __param(10, (0, inversify_1.inject)(types_1.TYPES.IUserPageSavedController)),
    __param(11, (0, inversify_1.inject)(types_1.TYPES.IOrderPageController)),
    __param(12, (0, inversify_1.inject)(types_1.TYPES.IItemController)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map