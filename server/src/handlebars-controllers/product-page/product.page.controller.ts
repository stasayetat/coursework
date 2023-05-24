import {BaseController} from "../../common/base.controller";
import {IProductPageController} from "./product.page.controller.interface";
import {injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
@injectable()
export class ProductPageController extends BaseController implements IProductPageController {
    private productPageMethod: IControllerRoute[] = [
        {
            path: '/:id',
            func: this.productPageFunc,
            method: 'get'
        },
        // {
        //     path: '/review/add',
        //     func: this.reviewAdd,
        //     method: 'post'
        // }
    ];

    constructor() {
        super();
        this.bindRoutes(this.productPageMethod);
    }

    public productPageFunc(req: Request, res: Response, next: NextFunction): void {
        console.log('Product-page render ' +  req.params.id);
        res.render('product-page', {
            username: 'Станіслав Ярець',
            itemName: 'Шуруповерт Tekhmann TCD-12 QC Li',
            itemPrice: 2400,
            itemDescription: 'Швидкозатискний з’ємний патрон (система DFR).\n' +
                '\n' +
                'Можливість роботи з бітами-викрутками без патрона – їх можна встановлювати безпосередньо в шестигранний посадковий отвір шпинделя (розмір ¼ дюйма).\n' +
                '\n' +
                'У комплект входять дві компактні Li-ion батареї та зарядний пристрій.\n' +
                '\n' +
                'Відсутність ефекту пам’яті та саморозряду батарей подовжує термін служби і час роботи акумуляторів.\n' +
                '\n' +
                'Час заряджання батареї становить всього 1 годину.⠀⠀⠀⠀⠀⠀\n' +
                '\n' +
                'Шуруповерт має два швидкісних режими – для операцій свердління і загвинчування/вигвинчування.\n' +
                '\n' +
                'Гальмо вибігу – миттєва зупинка обертання патрона при відпусканні пускової клавіші.\n' +
                '\n' +
                'За допомогою функції “реверс” Ви ​​зможете не тільки вкрутити або викрутити шуруп, а й вивільнити застрягле свердло. Також кнопка перемикача цієї функції може служити запобіжником від випадкового натискання пускової клавіші.\n' +
                '\n' +
                'Модель має можливість регулювання швидкості обертання в залежності від характеру виконуваних робіт.\n' +
                '\n' +
                'Світлодіодне підсвічування забезпечує більш комфортну та безпечну роботу з шуруповертом.\n' +
                '\n' +
                'Пластиковий кейс полегшує транспортування і зберігання інструмента.',
            itemCharacteristics: [
                {type: 'Тип', value: 'дриль-шуруповерт'},
                {type: 'Призначення', value: 'побутовий'},
                {type: 'Режим роботи', value: 'безударний'},

            ],
            reviews: [
                {
                    userName: 'Ivan',
                    rate: 3,
                    date: '01.01.1990',
                    bigComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur beatae cumque doloremque eos error, est labore laudantiu m, molestias nobis officiis quasi qui quibusdam reiciendis rem ullam vitae voluptatibus. Ad aliquid excepturi explicabo maiores nesc iunt. Aperiam iusto quae quisquam repellat? Alias architecto, consectetur consequuntur debitis dignissimos dolorum esse hic, illum i ste labore, nesciunt optio perferendis perspiciatis porro possimus quia reiciendis repellendus sed soluta ut! Aliquid exercitatione m laboriosam porro quam sunt! Aperiam assumenda explicabo modi nam neque quas voluptatem? Aliquid asperiores, at deleniti distincti o ea enim error expedita id incidunt maiores molestiae nam perspiciatis quibusdam quo repudiandae similique tenetur vel. Animi, itaq ue.',
                    advantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.',
                    disadvantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.'
                },
                {
                    userName: 'Petro',
                    rate: 1,
                    date: '01.01.1999',
                    bigComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur beatae cumque doloremque eos error, est labore laudantiu m, molestias nobis officiis quasi qui quibusdam reiciendis rem ullam vitae voluptatibus. Ad aliquid excepturi explicabo maiores nesc iunt. Aperiam iusto quae quisquam repellat? Alias architecto, consectetur consequuntur debitis dignissimos dolorum esse hic, illum i ste labore, nesciunt optio perferendis perspiciatis porro possimus quia reiciendis repellendus sed soluta ut! Aliquid exercitatione m laboriosam porro quam sunt! Aperiam assumenda explicabo modi nam neque quas voluptatem? Aliquid asperiores, at deleniti distincti o ea enim error expedita id incidunt maiores molestiae nam perspiciatis quibusdam quo repudiandae similique tenetur vel. Animi, itaq ue.',
                    advantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.',
                    disadvantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.'
                },
                {
                    userName: 'Max',
                    rate: 5,
                    date: '03.02.1234',
                    bigComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur beatae cumque doloremque eos error, est labore laudantiu m, molestias nobis officiis quasi qui quibusdam reiciendis rem ullam vitae voluptatibus. Ad aliquid excepturi explicabo maiores nesc iunt. Aperiam iusto quae quisquam repellat? Alias architecto, consectetur consequuntur debitis dignissimos dolorum esse hic, illum i ste labore, nesciunt optio perferendis perspiciatis porro possimus quia reiciendis repellendus sed soluta ut! Aliquid exercitatione m laboriosam porro quam sunt! Aperiam assumenda explicabo modi nam neque quas voluptatem? Aliquid asperiores, at deleniti distincti o ea enim error expedita id incidunt maiores molestiae nam perspiciatis quibusdam quo repudiandae similique tenetur vel. Animi, itaq ue.',
                    advantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.',
                    disadvantages: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, harum.'
                }
            ],
            itemCarouselImages: ['/src/items/U0456349_big.webp', '/src/items/U0456349_2big.webp','/src/items/U0456349_3big.webp'],
            simItems: [
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
                    photoSrc: '/src/items/U0477744.webp',
                    title: 'Монітор Samsung LF24T350FHIXCI',
                    price: '4999'
                },
            ]
        });
    }
}