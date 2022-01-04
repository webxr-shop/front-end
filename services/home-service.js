import { HttpService } from "./http-service.js";

export class HomeService {
    constructor() {
        this._http = new HttpService();
    }

    lists(data) {
        return this._http
            .post("http://localhost:3333/models", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
