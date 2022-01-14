import { ArService } from "../services/ar-service.js";
import { App } from "../webxr/app.js";

export function getModel(token) {
    let arService = new ArService();
    console.log("sd");
    var data = {
        token,
    };

    arService
        .getModel(data)
        .then((res) => {
            console.log(res._template);
            const app = new App();

            var but = document.getElementById("showAr");
            but.onclick = function () {
                app.showChair(res._template.file_model);
            };
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}
