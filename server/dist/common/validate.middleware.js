"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ValidateMiddleware {
    constructor(classToValidate) {
        this.classToValidate = classToValidate;
    }
    execute(req, res, next) {
        console.log(`Email is ${req.body.title}`);
        const instance = (0, class_transformer_1.plainToInstance)(this.classToValidate, req.body);
        (0, class_validator_1.validate)(instance).then((errors) => {
            if (errors.length > 0) {
                res.status(422).send(errors);
            }
            else {
                next();
            }
        });
    }
}
exports.ValidateMiddleware = ValidateMiddleware;
//# sourceMappingURL=validate.middleware.js.map