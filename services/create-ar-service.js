import { HttpService } from "./http-service.js";

export class CreateArService {
    constructor() {
        this._http = new HttpService();
    }

    newModel(data) {
        return this._http
            .post("http://localhost:3333/models/create", data)
            .then((res) => (window.location.href = "../category.html"))
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
