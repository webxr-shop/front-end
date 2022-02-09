import { HttpService } from "./http-service.js";

export class ProfileService {
    constructor() {
        this._http = new HttpService();
    }

    editProfile(data) {
        return this._http
            .post("profile/edit", data)
            .then((res) => {
                alert(res);
            })
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
    getProfile(data) {
        return this._http
            .post("profile", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
}
