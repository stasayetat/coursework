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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
let MongooseService = class MongooseService {
    constructor() {
        this.mongoose = new mongoose_1.Mongoose();
    }
    async connect() {
        if (process.env.DBURL !== undefined)
            await this.mongoose.connect(process.env.DBURL.concat('coursework'));
        else {
            console.log("Connected failed");
        }
        console.log("Connected success");
    }
    async close() {
        await this.mongoClient.close();
        console.log("Connected closed");
    }
};
MongooseService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MongooseService);
exports.MongooseService = MongooseService;
//# sourceMappingURL=mongoose.service.js.map