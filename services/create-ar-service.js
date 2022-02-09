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
                alert(erro);
            });
    }

    editModel(data) {
        return this._http
            .postSpecial("model/edit", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }

    editModelWithoutFile(data) {
        return this._http
            .post("model/edit/nofile", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }

    confirmation(data) {
        return this._http
            .post("models/confirmation", data)
            .then((res) => {
                if (res.lvl == 1) {
                    window.location.href = `../model-viewer.html?token=${res.token}`;
                } else {
                    window.location.href = `../models.html?id=${res.category_id}`;
                }
            })
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }

    getEdit(data) {
        return this._http
            .post("models/edit", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
    del(data) {
        return this._http
            .post("models/delete", data)
            .then((res) => window.location.reload())
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
}
