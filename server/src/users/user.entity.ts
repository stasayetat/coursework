import {hash} from "bcryptjs";

export class User {
    private _password: string;
    private _name: string;
    private _surname: string;
    private _cartItems: string[];
    private _savedItems: string[];
    private _orders: string[];

    constructor(private readonly _email: string) {
    }


    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    public async setPassword(pass: string, salt: number): Promise<void> {
        this._password = await hash(pass, salt);
    }


    get cartItems(): string[] {
        return this._cartItems;
    }

    set cartItems(value: string[]) {
        this._cartItems = value;
    }

    get savedItems(): string[] {
        return this._savedItems;
    }

    set savedItems(value: string[]) {
        this._savedItems = value;
    }

    get orders(): string[] {
        return this._orders;
    }

    set orders(value: string[]) {
        this._orders = value;
    }
}