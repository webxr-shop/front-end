import { ArService } from "../services/ar-service.js";

export function getModel(token) {
    let arService = new ArService();
    var data = {
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

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data.model.link,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}
