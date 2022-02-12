import { ArService } from "../services/ar-service.js";
import { HttpService } from "../services/http-service.js";

export function getModel(token) {
    let arService = new ArService();
    let data = {
        token,
    };

    arService
        .getModelViewer(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}

function params(data) {
    let model = document.getElementById("dimension-demo");
    model.setAttribute("src", data.model.file_model);

    let bt = document.getElementById("showAr");
    bt.onclick = function () {
        window.location.href = data.model.link;
    };

    let url = document.getElementById("url_link");
    url.setAttribute("value", data.model.link);

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data.model.link,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

export function getModelsAr(data) {
    let http = new HttpService();

    return http
        .post("models/get", data)
        .then((res) => res)
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}
