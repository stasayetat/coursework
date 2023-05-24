import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
export class AuthMiddleware implements IMiddleware {
    execute(req: Request, res: Response, next: NextFunction): void {
        console.log('Auth middleware');
        if(req.isAuthenticated()) {
            console.log('Next');
            next();
        } else {
            console.log('Redirect');
            return res.redirect('/login');
        }
    }

}