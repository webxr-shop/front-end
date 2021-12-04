import { HttpService } from "./http-service.js";

export class TesteService {
    constructor(){
        this._http = new HttpService();
    }

    importTeste(){
        return this._http
            .get('http://e875-2804-14d-5e83-82f7-bc03-f1c5-5e59-9494.ngrok.io/')
            .then((data) => console.log(data))
            .catch((erro) => {
                console.log(erro);
            });
    }
}
