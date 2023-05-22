import {BaseController} from "../../common/base.controller";
import {ISearchPageController} from "./search.page.controller.interface";
import {injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
@injectable()
export class SearchPageController extends BaseController implements ISearchPageController {
    private searchPageMethods: IControllerRoute[] = [
        {
            path: '/type/:name',
            func: this.searchItem,
            method: 'get'
        },
        {
            path: '/pages',
            func: this.getItemPages,
            method: 'get'
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.searchPageMethods);
    }

    public searchItem(req: Request, res: Response, next: NextFunction): void {
        const searchedText = req.params.name;
        const searchedProducts = [];
       // Передай в сервіс тип сортування, якщо є
        console.log('Search-page render ' +  searchedText);
        // Пошук в репозиторії продуктів
        res.render('search-page', {
            searchItemName: req.params.name,
            allItemsAmount: 101,
            allItems: [
                {
                    photoSrc: '/src/items/U0477744.webp',
                    title: 'Монітор Samsung LF24T350FHIXCI',
                    price: '4999'
                },

                {
                    photoSrc: '/src/items/U0529908.webp',
                    title: 'Батарея універсальна Xiaomi Redmi 20000mAh',
                    price: '699'
                },

                {
                    photoSrc: '/src/items/U0641069.webp',
                    title: 'Фітнес браслет Xiaomi Mi Smart Band 7 Black Global',
                    price: '1799'
                },

                {
                    photoSrc: '/src/items/U0692721.webp',
                    title: 'Телевізор Vinga S32HD25B',
                    price: '5399'
                },


                {
                    photoSrc: '/src/items/U0696363.webp',
                    title: 'Мобільний телефон Motorola G32 6/128Gb Mineral Grey',
                    price: '6999'
                },


                {
                    photoSrc: '/src/items/U0744424.webp',
                    title: 'Ноутбук Dell Vostro 3501',
                    price: '17777'
                },

                {
                    photoSrc: '/src/items/U0477744.webp',
                    title: 'Монітор Samsung LF24T350FHIXCI',
                    price: '4999'
                },

                {
                    photoSrc: '/src/items/U0529908.webp',
                    title: 'Батарея універсальна Xiaomi Redmi 20000mAh',
                    price: '699'
                },

                {
                    photoSrc: '/src/items/U0641069.webp',
                    title: 'Фітнес браслет Xiaomi Mi Smart Band 7 Black Global',
                    price: '1799'
                },

                {
                    photoSrc: '/src/items/U0692721.webp',
                    title: 'Телевізор Vinga S32HD25B',
                    price: '5399'
                },


                {
                    photoSrc: '/src/items/U0696363.webp',
                    title: 'Мобільний телефон Motorola G32 6/128Gb Mineral Grey',
                    price: '6999'
                },


                {
                    photoSrc: '/src/items/U0744424.webp',
                    title: 'Ноутбук Dell Vostro 3501',
                    price: '17777'
                },
            ]
        });
    }

    public getItemPages(req: Request, res: Response, next: NextFunction): void {
        console.log('Get pages ' +  req.query.name + ' ' + req.query.page);
        const name = req.query.name;
        const page = req.query.page;
        const newPageItems = [
            {
                photoSrc: '/src/items/U0692721.webp',
                title: 'Телевізор Vinga S32HD25B',
                price: '5399'
            },


            {
                photoSrc: '/src/items/U0696363.webp',
                title: 'Мобільний телефон Motorola G32 6/128Gb Mineral Grey',
                price: '6999'
            },


            {
                photoSrc: '/src/items/U0744424.webp',
                title: 'Ноутбук Dell Vostro 3501',
                price: '17777'
            }
        ];
        res.json(newPageItems);
    }
}
