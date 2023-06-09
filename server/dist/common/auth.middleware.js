"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    execute(req, res, next) {
        console.log('Auth middleware');
        if (req.isAuthenticated()) {
            console.log('Next');
            next();
        }
        else {
            console.log('Redirect');
            return res.redirect('/login');
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map