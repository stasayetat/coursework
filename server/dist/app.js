var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { injectable } from "inversify";
import express from "express";
let App = class App {
    constructor() {
        this.app = express();
        this.port = 8000;
    }
    init() {
        this.app.listen(this.port, () => {
            console.log(`Server started on ${this.port} port`);
        });
    }
};
App = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], App);
export { App };
//# sourceMappingURL=app.js.map