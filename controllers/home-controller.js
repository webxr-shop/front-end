import { HomeService } from "../services/home-service.js";
import { del } from "./create-ar-controller.js";
import { tables } from "./table-controller.js";
import { graphic } from "./graphic-controller.js";

export function models() {
    let homeService = new HomeService();
    var data = {
        token: localStorage.getItem("token"),
    };

    homeService
        .list_model_recent(data)
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

            let labels = [];
            let dataGraphic = [];
            let max = 0;
            for (let i = 0; i < res._categories.length; i++) {
                labels.push(res._categories[i].name);
                dataGraphic.push(res._categories[i].templates.length);
                if (res._categories[i].templates.length > max) {
                    max = res._categories[i].templates.length;
                }
            }
            graphic(labels, dataGraphic, max + 5);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}
