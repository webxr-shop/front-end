import { HttpService } from "./http-service.js";

export class CreateArService {
    constructor() {
        this._http = new HttpService();
    }

    newModel(data) {
        return this._http
            .postSpecial("media/create", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    confirmation(data) {
        return this._http
            .post("models/confirmation", data)
            .then(
                (res) =>
                    (window.location.href = `../models.html?id=${res.category_id}`)
            )
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }

    getEdit(data) {
        return this._http
            .post("models/edit", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    del(data) {
        return this._http
            .post("models/delete", data)
            .then((res) => window.location.reload())
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
