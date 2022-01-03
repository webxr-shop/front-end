import { HttpService } from "./http-service.js";

export class CategoryService {
    constructor() {
        this._http = new HttpService();
    }

    newModels(data) {
        return this._http
            .post("http://localhost:3333/models/create", data)
            .then((res) => (window.location.href = "../category.html"))
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    getModel(data) {
        return this._http
            .post("http://localhost:3333/models/get", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
