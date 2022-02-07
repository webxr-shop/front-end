import { ArService } from "../services/ar-service.js";

export function getModel(token) {
    let arService = new ArService();
    var data = {
        token,
    };

    arService
        .getModelViewer(data)
        .then((res) => {
            console.log(res);
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

function params(data) {
    let model = document.getElementById("dimension-demo");
    model.setAttribute("src", data.model.file_model);
}
