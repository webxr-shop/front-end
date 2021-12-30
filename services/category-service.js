import { HttpService } from "./http-service.js";

export class CategoryService {
    constructor() {
        this._http = new HttpService();
    }

    newCategory(data) {
        return this._http
            .post("http://localhost:3333/category/create", data)
            .then((res) => (window.location.href = "../create-ar.html"))
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    getCategories(data) {
        return this._http
            .post("http://localhost:3333/models/category", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
