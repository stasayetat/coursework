import {BaseController} from "../../common/base.controller";
import {injectable} from "inversify";
import 'reflect-metadata';
import {IMainPageController} from "./main.page.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
@injectable()
export class MainPageController extends BaseController implements IMainPageController{
    private mainPageMethod: IControllerRoute[] = [
        {
            path: '/',
            func: this.mainPageFunc,
            method: 'get'
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.mainPageMethod);
    }

    public mainPageFunc (req: Request, res: Response, next: NextFunction): void {
        console.log('Main-page render');
        res.render("home-page", {
            username: 'Станіслав Ярець',
            carouselImages: ['/src/carousel-images/64922.jpeg', '/src/carousel-images/2025682.jpg', '/src/carousel-images/2026232.jpg'],
            popularItems: [
                {title: 'Набір інструментів Palpino-4 SL', image: '/src/items/U0456349.webp', price: '882'},
                {title: 'Шуруповерт Tekhmann TCD-12', image: '/src/items/U0456969.webp', price: '2400'},
                {title: 'Шуруповерт Зеніт ЗША-12 М Li', image: '/src/items/U0489262.webp', price: '2282'}
            ]
        });
    };


}