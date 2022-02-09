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
            alert(erro);
        });
}

export function shopItem(token) {
    let data = {
        token,
    };

    let shopService = new ShopService();

    shopService
        .getShopModel(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
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
    img.setAttribute("src", res.model.thumb_model);

    let title = document.getElementById("title");
    title.innerHTML = res.model.name_model;

    let price = document.getElementById("price");
    price.innerHTML = `R$ ${res.model.price}`;

    let description = document.getElementById("description");
    description.innerHTML = res.model.description_model;

    let size = document.getElementById("size");
    size.innerHTML = `${res.model.dim_x}cm largura - ${res.model.dim_y}cm altura - ${res.model.dim_z}cm profundidade`;

    let supported = localStorage.getItem("isPossible");
    let car = document.getElementById("car");
    car.onclick = function () {
        addCarrinho();
    };

    if (supported == "true") {
        let but = document.getElementById("but");
        but.onclick = function () {
            window.location.href = `./webxr-viewer.html?token=${res.model.token}`;
        };
    } else {
        let but = document.getElementById("but");
        but.innerHTML = "Não compatível com Realidade Aumentada";
    }
    let count = localStorage.getItem("car");
    let carrinho = document.getElementById("carrinho");
    carrinho.innerHTML = count == null ? 0 : count;
}

export function addCarrinho() {
    let car = localStorage.getItem("car");
    if (car == null) {
        car = 1;
        localStorage.setItem("car", car);
    } else {
        let number = parseInt(car) + 1;
        localStorage.setItem("car", number);
    }
    let carrinho = document.getElementById("carrinho");
    carrinho.innerHTML = car;
}
export function deleteCar() {
    localStorage.removeItem("car");
}
