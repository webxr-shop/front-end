import { CategoryService } from "../services/category-service.js";
import { del } from "./create-ar-controller.js";
import { tables } from "./table-controller.js";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = [
    "bg-primary",
    "bg-warning",
    "bg-success",
    "bg-danger",
    "bg-secondary",
    "bg-info",
    "bg-black",
    "bg-dark",
];

export function categories() {
    let categoryService = new CategoryService();
    let data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .getCategories(data)
        .then((res) => {
            for (let i = 0; i < res["_categories"].length; i++) {
                let color = colors[getRandomIntInclusive(0, colors.length - 1)];

                let categories = document.getElementById("categories");

                let divMain = document.createElement("div");
                divMain.setAttribute("class", "col-xl-3 col-md-6");

                let divCard = document.createElement("div");
                divCard.setAttribute(
                    "class",
                    "card " + color + " text-white mb-4"
                );

                let divName = document.createElement("div");
                divName.setAttribute("class", "card-body");
                divName.innerHTML = res["_categories"][i]["name"];
                let divCount = document.createElement("div");

                let text =
                    res["_categories"][i]["templates"].length == 1
                        ? " modelo"
                        : " modelos";

                divCount.innerHTML =
                    res["_categories"][i]["templates"].length + text;
                let div = document.createElement("div");
                div.setAttribute(
                    "class",
                    "card-footer d-flex align-items-center justify-content-between"
                );

                let aModels = document.createElement("a");
                aModels.setAttribute(
                    "class",
                    "small text-white stretched-link"
                );
                aModels.setAttribute(
                    "href",
                    "models.html?id=" + res["_categories"][i]["id"]
                );
                aModels.innerHTML = "Ver modelos";

                let divText = document.createElement("div");
                divText.setAttribute("class", "small text-white");

                let iSet = document.createElement("i");
                iSet.setAttribute("class", "fas fa-angle-right");

                divText.appendChild(iSet);
                div.appendChild(aModels);
                div.appendChild(divText);
                divCard.appendChild(divName);
                divName.appendChild(divCount);
                divCard.appendChild(div);
                divMain.appendChild(divCard);
                categories.appendChild(divMain);
            }
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}

export function models(category_id) {
    let categoryService = new CategoryService();
    let data = {
        token: localStorage.getItem("token"),
        category_id: parseInt(category_id),
    };

    categoryService
        .listModels(data)
        .then((res) => {
            let title = document.getElementById("name");
            title.innerHTML = res.category.name;
            let title2 = document.getElementById("name2");
            title2.innerHTML = res.category.name;
            let title3 = document.getElementById("name3");
            title3.innerHTML = res.category.name;

            let data = [];
            for (let i = 0; i < res._templates.length; i++) {
                let array = [
                    res._templates[i].id.toString(),
                    res._templates[i].name_model,
                    res._templates[i].category.name,
                    `<div class="row">
                        <div class="col-2 d-flex align-items-center">
                            <a href="model-viewer.html?token=${res._templates[i].token}">
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
            // alert(erro);
        });
}

export function create(e) {
    e.preventDefault();
    let categoryService = new CategoryService();
    let data = {
        name: e.target[0].value,

        description: e.target[1].value,
        token: localStorage.getItem("token"),
    };

    categoryService.newCategory(data);
}
