import { HttpService } from "./http-service.js";

export class HomeService {
    constructor() {
        this._http = new HttpService();
    }

    list_model_recent(data) {
        return this._http
            .post("http://localhost:3333/models/recent", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
