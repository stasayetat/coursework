export class MiniItem {
    private _title: string;
    private _image: string;
    private _price: number;


    constructor(title: string, image: string, price: number) {
        this._title = title;
        this._image = image;
        this._price = price;
    }


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}