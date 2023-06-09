import {Category} from "./category.enum";
import {Review} from "./reviews/review.entity";

export class Item {
    private _title: string;
    private _category: Category;
    private _price: number;
    private _photos: string[];
    private _characteristics: Map<string, string>;
    private _reviews: Review[];


    constructor(title: string, category: Category, price: number, photos: string[], characteristics: Map<string, string>, reviews: Review[]) {
        this._title = title;
        this._category = category;
        this._price = price;
        this._photos = photos;
        this._characteristics = characteristics;
        this._reviews = reviews;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get photos(): string[] {
        return this._photos;
    }

    set photos(value: string[]) {
        this._photos = value;
    }

    get characteristics(): Map<string, string> {
        return this._characteristics;
    }

    set characteristics(value: Map<string, string>) {
        this._characteristics = value;
    }


    get reviews(): Review[] {
        return this._reviews;
    }

    set reviews(value: Review[]) {
        this._reviews = value;
    }
}