import { HttpService } from "./http-service.js";

export class TesteService {
    constructor() {
        this._http = new HttpService();
    }

    importTeste() {
        return this._http
            .get("http://localhost:3333")
            .then((data) => console.log(data))
            .catch((erro) => {
                console.log(erro);
            });
    }
}
