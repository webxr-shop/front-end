import { HttpService } from "./http-service.js";

export class CategoryService {
    constructor() {
        this._http = new HttpService();
    }

    newCategory(data) {
        return this._http
            .post("category/create", data)
            .then((res) => (window.location.href = "../create-ar.html"))
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    getCategories(data) {
        return this._http
            .post("categories", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    listCategories(data) {
        return this._http
            .post("category/name", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    listModels(data) {
        return this._http
            .post("models", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
