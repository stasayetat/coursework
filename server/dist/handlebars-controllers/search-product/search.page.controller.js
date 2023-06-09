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
exports.SearchPageController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../../types");
const mini_item_entity_1 = require("../../items/mini.item.entity");
const check_auth_middleware_1 = require("../../common/check.auth.middleware");
let SearchPageController = class SearchPageController extends base_controller_1.BaseController {
    constructor(itemsService, checkAuthMiddleware) {
        super();
        this.itemsService = itemsService;
        this.checkAuthMiddleware = checkAuthMiddleware;
        this.searchPageMethods = [
            {
                path: '/type',
                func: this.searchItem,
                method: 'get',
                middlewares: [this.checkAuthMiddleware]
            },
            {
                path: '/type/pages',
                func: this.getItemPages,
                method: 'get'
            },
            {
                path: '/type/sort',
                func: this.sortItems,
                method: 'get'
            }
        ];
        this.productsPagesArr = [];
        this.bindRoutes(this.searchPageMethods);
    }
    async searchItem(req, res, next) {
        const searchedText = req.query.name;
        const searchedType = req.query.type;
        let authUser;
        if (req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        let searchedProducts = await this.itemsService.getItems(searchedText, searchedType);
        console.log('Search-page render ' + searchedText + ' ' + searchedType);
        let prodLen;
        this.productsPagesArr = [];
        if (Array.isArray(searchedProducts)) {
            prodLen = searchedProducts.length;
            const filteredProducts = searchedProducts.map((item => {
                return new mini_item_entity_1.MiniItem(item.title, item.photos[0], item.price);
            }));
            console.log('Seac' + filteredProducts);
            for (let i = 0; i < searchedProducts.length; i += 20) {
                this.productsPagesArr.push(filteredProducts.slice(i, i + 20));
            }
        }
        else if (searchedProducts === null) {
            prodLen = 0;
        }
        else {
            this.productsPagesArr.push([new mini_item_entity_1.MiniItem(searchedProducts.title, searchedProducts.photos[0], searchedProducts.price)]);
            prodLen = 1;
        }
        console.log('Search-page render ' + searchedText + ' ' + searchedType);
        return res.render('search-page', {
            searchItemName: req.query.name,
            allItemsAmount: prodLen,
            allItems: this.productsPagesArr[0],
            username: authUser?.email,
            cartItems: authUser?.cartItems.length
        });
    }
    getItemPages(req, res, next) {
        const page = Number(req.query.page) - 1;
        console.log(`Page is ${page}`);
        const newPageItems = this.productsPagesArr[page];
        console.log(newPageItems);
        res.send(newPageItems);
    }
    sortItems(req, res, next) {
        const sortMeth = req.query.sort;
        let sortNumParam = req.query.sortNum;
        const sortNum = Number(sortNumParam);
        console.log(`Method is ${sortMeth} and ${sortNum}`);
        const mergedArray = this.productsPagesArr.reduce((acc, curr) => acc.concat(curr), []);
        const sortedArray = mergedArray.sort((a, b) => {
            if (a[sortMeth] > b[sortMeth]) {
                console.log(`${a[sortMeth]} > ${b[sortMeth]}`);
                return sortNum;
            }
            if (a[sortMeth] < b[sortMeth]) {
                console.log(`${a[sortMeth]} < ${b[sortMeth]}`);
                return -sortNum;
            }
            console.log(`${a[sortMeth]} === ${b[sortMeth]}`);
            return 0;
        });
        this.productsPagesArr = [];
        for (let i = 0; i < sortedArray.length; i += 20) {
            this.productsPagesArr.push(sortedArray.slice(i, i + 20));
        }
        console.log('Len is ' + this.productsPagesArr.length);
        res.send(this.productsPagesArr[0]);
    }
};
SearchPageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CheckAuthMiddleware)),
    __metadata("design:paramtypes", [Object, check_auth_middleware_1.CheckAuthMiddleware])
], SearchPageController);
exports.SearchPageController = SearchPageController;
//# sourceMappingURL=search.page.controller.js.map