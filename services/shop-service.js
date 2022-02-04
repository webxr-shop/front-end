import { HttpService } from "./http-service.js";

export class ShopService {
    constructor() {
        this._http = new HttpService();
    }

    list(data) {
        return this._http
            .post("http://localhost:3333/shop", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    getModel(data) {
        return this._http
            .post("http://localhost:3333/shop/model", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
