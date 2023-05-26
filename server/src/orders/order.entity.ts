import {Item} from "../items/item.entity";

export class Order {
    private _orderNumber: number;
    private _date: Date;
    private _orderStatus: string;
    private _items: Map<string, number>;
    private _price: number;
    private _paymentMethod: string;
    private _userEmail: string;
    private _address: string;

    constructor(items: Map<string, number>, paymentMethod: string, userEmail: string, address: string) {
        this._items = items;
        this._paymentMethod = paymentMethod;
        this._userEmail = userEmail;
        this._address = address;
    }

    get orderNumber(): number {
        return this._orderNumber;
    }

    set orderNumber(value: number) {
        this._orderNumber = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get orderStatus(): string {
        return this._orderStatus;
    }

    set orderStatus(value: string) {
        this._orderStatus = value;
    }


    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get paymentMethod(): string {
        return this._paymentMethod;
    }

    set paymentMethod(value: string) {
        this._paymentMethod = value;
    }

    get userEmail(): string {
        return this._userEmail;
    }

    set userEmail(value: string) {
        this._userEmail = value;
    }


    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }


    get items(): Map<string, number> {
        return this._items;
    }

    set items(value: Map<string, number>) {
        this._items = value;
    }
}