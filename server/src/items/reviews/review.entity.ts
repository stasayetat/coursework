export class Review {
    private _rate: string;
    private _bigComment: string;
    private _advantages: string;
    private _minuses: string;
    private _userName: string;


    constructor(rate: string, bigComment: string, advantages: string, minuses: string, userName: string,) {
        this._rate = rate;
        this._bigComment = bigComment;
        this._advantages = advantages;
        this._minuses = minuses;
        this._userName = userName;
    }


    get rate(): string {
        return this._rate;
    }

    set rate(value: string) {
        this._rate = value;
    }

    get bigComment(): string {
        return this._bigComment;
    }

    set bigComment(value: string) {
        this._bigComment = value;
    }

    get advantages(): string {
        return this._advantages;
    }

    set advantages(value: string) {
        this._advantages = value;
    }

    get minuses(): string {
        return this._minuses;
    }

    set minuses(value: string) {
        this._minuses = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

}