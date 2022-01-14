import { CategoryService } from "../services/category-service.js";
import { del } from "./create-ar-controller.js";
import { tables } from "./table-controller.js";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = ["bg-primary", "bg-warning", "bg-success", "bg-danger"];

export function categories() {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .getCategories(data)
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res["_categories"].length; i++) {
                var color = colors[getRandomIntInclusive(0, 3)];

                var categories = document.getElementById("categories");

                var divMain = document.createElement("div");
                divMain.setAttribute("class", "col-xl-3 col-md-6");

                var divCard = document.createElement("div");
                divCard.setAttribute(
                    "class",
                    "card " + color + " text-white mb-4"
                );

                var divName = document.createElement("div");
                divName.setAttribute("class", "card-body");
                divName.innerHTML = res["_categories"][i]["name"];
                var div = document.createElement("div");
                div.setAttribute(
                    "class",
                    "card-footer d-flex align-items-center justify-content-between"
                );

                var aModels = document.createElement("a");
                aModels.setAttribute(
                    "class",
                    "small text-white stretched-link"
                );
                aModels.setAttribute(
                    "href",
                    "category.html?id=" + res["_categories"][i]["id"]
                );
                aModels.innerHTML = "Ver modelos";

                var divText = document.createElement("div");
                divText.setAttribute("class", "small text-white");

                var iSet = document.createElement("i");
                iSet.setAttribute("class", "fas fa-angle-right");

                divText.appendChild(iSet);
                div.appendChild(aModels);
                div.appendChild(divText);
                divCard.appendChild(divName);
                divCard.appendChild(div);
                divMain.appendChild(divCard);
                categories.appendChild(divMain);
            }
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

export function models(category_id) {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
        category_id: parseInt(category_id),
    };

    categoryService
        .listModels(data)
        .then((res) => {
            console.log(res);
            let data = [];
            for (let i = 0; i < res._templates.length; i++) {
                let array = [
                    res._templates[i].id.toString(),
                    res._templates[i].name_model,
                    res._templates[i].category.name,
                    `<div class="row">
                        <div class="col-2 d-flex align-items-center">
                            <a href="webxr/app.html?token=${res._templates[i].token}">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-link"></i>
                                    Visualizar
                                </div>
                            </a>
                        </div>
                        <div class="col-2 d-flex align-items-center">
                            <a href="edit-ar.html?token=${res._templates[i].token}">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-edit"></i>
                                    Editar
                                </div>
                            </a>
                        </div>
                        <div class="col-2 d-flex align-items-center">
                            <a id="${res._templates[i].token}" key="${res._templates[i].token}" href=# >
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-trash"></i>
                                    Excluir
                                </div>
                            </a>
                        </div>
                        
                    </div>
                    `,
                ];

                data.push(array);
            }

            tables(data);

            for (let i = 0; i < res._templates.length; i++) {
                document.getElementById(res._templates[i].token).onclick =
                    function () {
                        del(res._templates[i].token);
                    };
            }
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}
