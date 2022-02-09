import { HttpService } from "./http-service.js";

export class HomeService {
    constructor() {
        this._http = new HttpService();
    }

    list_model_recent(data) {
        return this._http
            .post("models/recent", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
}
