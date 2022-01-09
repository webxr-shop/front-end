import { CategoryService } from "../services/category-service.js";
import { CreateArService } from "../services/create-ar-service.js";

export function create(e, file) {
    e.preventDefault();
    let createArService = new CreateArService();
    let data = {
        name_model: e.target[0].value,
        file_model: e.target[2].value,
        // dim_x: parseFloat(e.target[2].value),
        // dim_y: parseFloat(e.target[3].value),
        // dim_z: parseFloat(e.target[4].value),
        // name_product: "",
        // description_product: "",
        // thumb_product: "",
        // category_id: parseInt(e.target[0].value),
        // token: localStorage.getItem("token"),
    };
    console.log(e.target[2].value);
    createArService.newModel(data);
}

export function del(model_id) {
    let createArService = new CreateArService();
    let data = {
        model_id,
    };
    createArService.del(data);
}

export function editing(e, file) {
    e.preventDefault();
    let createArService = new CreateArService();
    let data = {
        name_model: e.target[1].value,
        file_model: file,
        dim_x: parseFloat(e.target[2].value),
        dim_y: parseFloat(e.target[3].value),
        dim_z: parseFloat(e.target[4].value),
        name_product: "",
        description_product: "",
        thumb_product: "",
        category_id: parseInt(e.target[0].value),
        token: localStorage.getItem("token"),
    };

    createArService.newModel(data);
}

export function getCategories() {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .listCategories(data)
        .then((res) => {
            var selects = document.getElementById("selectCategory");
            var selectMain = document.createElement("option");
            selectMain.selected = true;
            selectMain.innerHTML = "Selecione a categoria";
            selectMain.setAttribute("value", "");
            selectMain.setAttribute("id", "options");
            selects.appendChild(selectMain);
            for (let i = 0; i < res["_categories"].length; i++) {
                var options = document.createElement("option");
                options.setAttribute("value", res["_categories"][i]["id"]);
                options.innerHTML = res["_categories"][i]["name"];
                selects.appendChild(options);
            }
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

export function getEdit(id) {
    let createArService = new CreateArService();
    var data = {
        model_id: id,
    };

    createArService
        .getEdit(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

function params(res) {
    console.log(res);
    serCategories(res["_template"]["category_id"]);
    var name = document.getElementById("inputNameModel");
    var largura = document.getElementById("inputWidth");
    var altura = document.getElementById("inputHeight");
    var comprimento = document.getElementById("inputLength");

    name.value = res["_template"]["name_model"];
    largura.value = res["_template"]["dim_x"];
    altura.value = res["_template"]["dim_y"];
    comprimento.value = res["_template"]["dim_z"];
}

export function serCategories(category_id) {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .listCategories(data)
        .then((res) => {
            var selects = document.getElementById("selectCategory");
            var selectMain = document.createElement("option");
            for (let i = 0; i < res["_categories"].length; i++) {
                if (category_id == res["_categories"][i]["id"]) {
                    selectMain.selected = true;
                    selectMain.innerHTML = res["_categories"][i]["name"];
                    selectMain.setAttribute(
                        "value",
                        res["_categories"][i]["id"]
                    );
                    selectMain.setAttribute("id", "options");
                    selects.appendChild(selectMain);
                }
            }

            for (let i = 0; i < res["_categories"].length; i++) {
                if (category_id != res["_categories"][i]["id"]) {
                    var options = document.createElement("option");
                    options.setAttribute("value", res["_categories"][i]["id"]);
                    options.innerHTML = res["_categories"][i]["name"];
                    selects.appendChild(options);
                }
            }
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}
