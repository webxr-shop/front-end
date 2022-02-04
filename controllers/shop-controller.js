import { ShopService } from "../services/shop-service.js";

export function list(e) {
    let shopService = new ShopService();

    shopService
        .list()
        .then((res) => {
            plot_list(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

export function shopItem(token) {
    let data = {
        token,
    };

    let shopService = new ShopService();

    shopService
        .getModel(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

function plot_list(data) {
    let list = document.getElementById("list");

    for (let i = 0; i < data._templates.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="col mb-5">
        <div class="card h-100">

        <img class="card-img-top" src="${data._templates[i].thumb_model}" alt="..." />

        <div class="card-body p-4">
        <div class="text-center">

        <h5 class="fw-bolder">${data._templates[i].name_model}</h5>

        R$ ${data._templates[i].price}
        </div>
        </div>

        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center">
        <a class="btn btn-outline-dark mt-auto" href="shop-item.html?token=${data._templates[i].token}">Comprar</a>
        </div>
        </div>
        </div>
        </div>`;

        list.appendChild(div);
    }
}

function params(res) {
    let img = document.getElementById("imgs");
    img.setAttribute("src", res._templates.thumb_model);

    let title = document.getElementById("title");
    title.innerHTML = res._templates.name_model;

    let price = document.getElementById("price");
    price.innerHTML = `R$ ${res._templates.price}`;

    let description = document.getElementById("description");
    description.innerHTML = res._templates.description_model;

    let but = document.getElementById("but");
    but.setAttribute("href", `webxr/app.html?token=${res._templates.tokens}`);
}
