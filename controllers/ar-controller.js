import { ArService } from "../services/ar-service.js";

export function getModel(token) {
    let arService = new ArService();
    var data = {
        token,
    };

    arService
        .getModel(data)
        .then((res) => {
            plot_list(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

function plot_list(data) {
    let list = document.getElementById("mySidenav");

    for (let i = 0; i < data.models.length; i++) {
        let a = document.createElement("a");
        a.setAttribute("class", "ar-object");
        a.setAttribute("id", data.models[i].file_model);
        a.setAttribute("href", "#");
        a.onclick = function () {
            closeNav();
            test(data.models[i].file_model);
        };

        a.innerHTML = data.models[i].name_model;

        list.appendChild(a);
    }
}
