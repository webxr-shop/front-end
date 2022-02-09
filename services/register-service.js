import { HttpService } from "./http-service.js";

export class RegisterService {
    constructor() {
        this._http = new HttpService();
    }

    newClient(data) {
        return this._http
            .post("login/sign", data)
            .then((res) => this.set_token(res.token))
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }

    set_token(token) {
        localStorage.setItem("token", token);

        window.location.href = "../admin.html";
    }
}
