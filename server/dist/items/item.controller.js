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
exports.ItemController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const validate_middleware_1 = require("../common/validate.middleware");
const item_create_dto_1 = require("./dto/item.create.dto");
const types_1 = require("../types");
let ItemController = class ItemController extends base_controller_1.BaseController {
    constructor(itemsService) {
        super();
        this.itemsService = itemsService;
        this.itemsMethods = [
            {
                path: '/create',
                func: this.createItem,
                method: 'post',
                middlewares: [new validate_middleware_1.ValidateMiddleware(item_create_dto_1.ItemCreateDto)]
            },
            {
                path: '/delete',
                func: this.deleteItem,
                method: 'delete',
            },
            {
                path: '/find',
                func: this.findItems,
                method: 'get'
            }
        ];
        this.bindRoutes(this.itemsMethods);
    }
    async createItem({ body }, res, next) {
        console.log(`Item ${body.title} here`);
        const createdItem = await this.itemsService.createItem(body);
        if (createdItem === null) {
            res.send('Null');
        }
        else {
            res.send(`Item created ${createdItem.title}`);
        }
    }
    async deleteItem(req, res, next) {
        const deletedItem = await this.itemsService.deleteItems(req.body.name);
        if (deletedItem === null) {
            res.send('Nothing to delete');
        }
        else {
            res.send(`Item deleted ${deletedItem.title}`);
        }
    }
    async findItems(req, res, next) {
    }
};
ItemController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __metadata("design:paramtypes", [Object])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map