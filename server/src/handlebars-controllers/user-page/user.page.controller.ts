import {BaseController} from "../../common/base.controller";
import {IUserPageController} from "./user.page.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {AuthMiddleware} from "../../common/auth.middleware";
import {get} from "lodash";
import {ValidateMiddleware} from "../../common/validate.middleware";
import {UserUpdateInfoDto} from "../../users/dto/user.update.info.dto";
import {TYPES} from "../../types";
import {inject} from "inversify";
import {IUsersService} from "../../users/users.service.interface";
import {UserLoginDto} from "../../users/dto/user.login.dto";
export class UserPageController extends BaseController implements IUserPageController {
    private userPageMethods: IControllerRoute[] = [
        {
            path: '/',
            func: this.userPageFunc,
            method: 'get',
            middlewares: [new AuthMiddleware()]
        },

        {
            path: '/',
            func: this.editUserData,
            method: 'post',
            middlewares: [new ValidateMiddleware(UserUpdateInfoDto)]
        },

        {
            path: '/logout',
            func: this.userLogout,
            method: 'get'
        }
    ];

    constructor(@inject(TYPES.IUsersService) private userService: IUsersService) {
        super();
        this.bindRoutes(this.userPageMethods);
    }

    public async userPageFunc(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
        let authUser = await this.userService.getInfoUser(req.body.email);
        console.log('User-page render');
        res.render('user-page', {
            surname: get(req, 'user.surname'),
            name: get(req, 'user.name'),
            email: get(req, 'user.email'),
            cartItems: authUser?.cartItems.length
        });
    }

    public async editUserData(req: Request<{}, {}, UserUpdateInfoDto>, res: Response, next: NextFunction): Promise<void> {
        console.log(`Email is ${req.body.email} - ${req.body.prevPassword} : ${req.body.newPassword}`);
        if(await this.userService.validateUser(new UserLoginDto(req.body.email, req.body.prevPassword))) {
            await this.userService.updateUserInformation(req.body);
            res.redirect('/users');
        } else {
            res.json({error: 'Bad password'});
        }
    }

    public userLogout(req: Request, res: Response, next: NextFunction): void {
        req.logOut(()=>{});
        res.redirect('/login');
    }


}