import {BaseController} from "../../common/base.controller";
import {ISearchPageController} from "./search.page.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../../types";
import {IItemsService} from "../../items/items.service.interface";
import {Item} from "../../items/item.entity";
import {MiniItem} from "../../items/mini.item.entity";
import {CheckAuthMiddleware} from "../../common/check.auth.middleware";
@injectable()
export class SearchPageController extends BaseController implements ISearchPageController {
    private searchPageMethods: IControllerRoute[] = [
        {
            path: '/type',
            func: this.searchItem,
            method: 'get',
            middlewares: [this.checkAuthMiddleware]
        },
        {
            path: '/type/pages',
            func: this.getItemPages,
            method: 'get'
        },
        {
            path: '/type/sort',
            func: this.sortItems,
            method: 'get'
        }
    ];

    private productsPagesArr: MiniItem[][] = [];

    constructor(@inject(TYPES.IItemsService) private itemsService: IItemsService,
                @inject(TYPES.CheckAuthMiddleware) private checkAuthMiddleware: CheckAuthMiddleware,) {
        super();
        this.bindRoutes(this.searchPageMethods);
    }

    public async searchItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        const searchedText = req.query.name;
        const searchedType = req.query.type;
        let authUser;
        if(req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        let searchedProducts = await this.itemsService.getItems(searchedText as string, searchedType as 'name' | 'category');
        // Передай в сервіс тип сортування, якщо є
        console.log('Search-page render ' +  searchedText + ' ' + searchedType);
        let prodLen: number;
        this.productsPagesArr = [];
        if(Array.isArray(searchedProducts)) {
            prodLen = searchedProducts.length;
            const filteredProducts = searchedProducts.map((item=>{
                return new MiniItem(item.title, item.photos[0], item.price);
            }));
            console.log('Seac' + filteredProducts);
            for(let i = 0; i < searchedProducts.length; i += 20) {
                this.productsPagesArr.push(filteredProducts.slice(i, i+20));
            }
        } else if (searchedProducts === null) {
            prodLen = 0;
        }
        else {
            this.productsPagesArr.push([new MiniItem(searchedProducts.title, searchedProducts.photos[0], searchedProducts.price)]);
            prodLen = 1;
        }
        // Пошук в репозиторії продуктів
        console.log('Search-page render ' +  searchedText + ' ' + searchedType);
        return res.render('search-page', {
            searchItemName: req.query.name,
            allItemsAmount: prodLen,
            allItems: this.productsPagesArr[0],
            username: authUser?.email,
            cartItems: authUser?.cartItems.length
        });
    }

    public getItemPages(req: Request, res: Response, next: NextFunction): void {
        const page = Number(req.query.page as string)-1;
        console.log(`Page is ${page}`);
        const newPageItems = this.productsPagesArr[page];
        console.log(newPageItems);
        res.send(newPageItems);
    }

    public sortItems(req: Request, res: Response, next: NextFunction): void {
        const sortMeth = req.query.sort as 'price' | 'title';
        let sortNumParam = req.query.sortNum;
        const sortNum = Number(sortNumParam);
        console.log(`Method is ${sortMeth} and ${sortNum}`);
        const mergedArray = this.productsPagesArr.reduce((acc, curr) => acc.concat(curr), []);
        const sortedArray = mergedArray.sort((a, b)=> {
            if(a[sortMeth] > b[sortMeth]) {
                console.log(`${a[sortMeth]} > ${b[sortMeth]}`);
                return sortNum;
            }
            if(a[sortMeth] < b[sortMeth]) {
                console.log(`${a[sortMeth]} < ${b[sortMeth]}`);
                return -sortNum;
            }
            console.log(`${a[sortMeth]} === ${b[sortMeth]}`);
            return 0;
        });
        this.productsPagesArr = [];
        for(let i = 0; i < sortedArray.length; i += 20) {
            this.productsPagesArr.push(sortedArray.slice(i, i+20));
        }
        console.log('Len is ' + this.productsPagesArr.length);
        res.send(this.productsPagesArr[0]);
    }
}
