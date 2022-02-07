import { HttpService } from "./http-service.js";

export class ShopService {
    constructor() {
        this._http = new HttpService();
    }

    list(data) {
        return this._http
            .post("shop", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    getShopModel(data) {
        return this._http
            .post("shop/model", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
