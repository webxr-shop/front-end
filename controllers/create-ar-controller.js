import { CategoryService } from "../services/category-service.js";
import { CreateArService } from "../services/create-ar-service.js";

export class CreateARController {
    create(data) {
        let createArService = new CreateArService();

        createArService.newModel(data);
    }
    getCategories() {
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
}
