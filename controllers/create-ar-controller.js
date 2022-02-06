import { CategoryService } from "../services/category-service.js";
import { CreateArService } from "../services/create-ar-service.js";

export function create(e, file, img) {
    e.preventDefault();
    let createArService = new CreateArService();
    let data = new FormData();
    data.append("category_id", parseInt(e.target[0].value));
    data.append("name_model", e.target[1].value);
    data.append("description_model", e.target[2].value);
    data.append("price", parseFloat(e.target[3].value));
    data.append("dim_x", parseFloat(e.target[4].value));
    data.append("dim_y", parseFloat(e.target[5].value));
    data.append("dim_z", parseFloat(e.target[6].value));
    data.append("file", file);

    data.append("token", localStorage.getItem("token"));

    createArService.newModel(data).then((res) => {
        let api = "http://localhost:3333/";
        let reqs = {
            id: res.id,
            thumb_model: img,
            link: api + "webxr-viewer.html",
            category_id: parseInt(e.target[0].value),
        };

        console.log(reqs);
        createArService.confirmation(reqs);
    });
}

export function del(token) {
    let createArService = new CreateArService();
    let data = {
        token,
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
        name_model: "",
        description_model: "",
        thumb_model: "",
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

export function getEdit(token) {
    let createArService = new CreateArService();
    var data = {
        token,
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
    var name = document.getElementById("inputName");
    var description = document.getElementById("inputDescription");
    var price = document.getElementById("inputPrice");
    var width = document.getElementById("inputWidth");
    var height = document.getElementById("inputHeight");
    var length = document.getElementById("inputLength");

    name.value = res["_template"]["name_model"];
    description.value = res["_template"]["description_model"];
    price.value = res["_template"]["price"];
    width.value = res["_template"]["dim_x"];
    height.value = res["_template"]["dim_y"];
    length.value = res["_template"]["dim_z"];
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
