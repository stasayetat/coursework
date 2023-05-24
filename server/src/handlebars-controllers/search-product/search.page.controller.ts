import {BaseController} from "../../common/base.controller";
import {ISearchPageController} from "./search.page.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../../types";
import {IItemsService} from "../../items/items.service.interface";
import {Item} from "../../items/item.entity";
@injectable()
export class SearchPageController extends BaseController implements ISearchPageController {
    private searchPageMethods: IControllerRoute[] = [
        {
            path: '/type',
            func: this.searchItem,
            method: 'get'
        },
        {
            path: '/type/pages',
            func: this.getItemPages,
            method: 'get'
        }
    ];

    private productsPagesArr: {photoSrc: string, title: string, price: string}[][] = [];

    constructor(@inject(TYPES.IItemsService) private itemsService: IItemsService) {
        super();
        this.bindRoutes(this.searchPageMethods);
    }

    public async searchItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        const searchedText = req.query.name;
        const searchedType = req.query.type;
        let searchedProducts = await this.itemsService.getItems(searchedText as string, searchedType as 'name' | 'category');
        // Передай в сервіс тип сортування, якщо є
        console.log('Search-page render ' +  searchedText + ' ' + searchedType);
        let prodLen: number;
        let allProdRender: {photos: string, title: string, price: string} [] = [];
        if(Array.isArray(searchedProducts)) {
            prodLen = searchedProducts.length;
            const filteredProducts = searchedProducts.map((item=>{
                return {
                    photoSrc: item.photos[0],
                    title: item.title,
                    price: item.price.toString()
                }
            }));
            console.log('Seac' + filteredProducts);
            for(let i = 0; i < searchedProducts.length; i += 20) {
                this.productsPagesArr.push(filteredProducts.slice(i, i+20));
            }
        } else if (searchedProducts === null) {
            prodLen = 0;
        }
        else {
            this.productsPagesArr.push([{
                photoSrc: searchedProducts.photos[0],
                title: searchedProducts.title,
                price: searchedProducts.price.toString()
            }]);
            prodLen = 1;
        }
        // Пошук в репозиторії продуктів
        res.render('search-page', {
            searchItemName: req.query.name,
            allItemsAmount: prodLen,
            allItems: this.productsPagesArr[0]
        });
    }

    public getItemPages(req: Request, res: Response, next: NextFunction): void {
        const page = Number(req.query.page as string)-1;
        console.log(`Page is ${page}`);
        const newPageItems = this.productsPagesArr[page];
        console.log(newPageItems);
        // res.render('search-page', {
        //     searchItemName: req.query.name,
        //     allItemsAmount: this.productsPagesArr.length,
        //     allItems: newPageItems
        // });
        res.send(newPageItems);
    }
}
