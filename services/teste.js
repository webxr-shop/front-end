import { HttpService } from "./http-service.js";

export class TesteService {
    constructor() {
        this._http = new HttpService();
    }

    importTeste() {
        return this._http
            .get("http://ec2-18-116-73-46.us-east-2.compute.amazonaws.com:3333")
            .then((data) => console.log(data))
            .catch((erro) => {
                console.log(erro);
            });
    }
}
