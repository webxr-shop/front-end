import { ProfileService } from "../services/profile-service.js";

export function getProfile() {
    let profileService = new ProfileService();
    let data = {
        token: localStorage.getItem("token"),
    };

    profileService
        .getProfile(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}

export function editProfile(e) {
    let profileService = new ProfileService();
    e.preventDefault();
    let check = true;
    if (e.target[3].value != e.target[4].value) {
        check = false;
        alert("Senhas incompatíveis");
    }
    if (check) {
        let data = {
            token: localStorage.getItem("token"),
            name: e.target[0].value,
            last_name: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        };
        profileService
            .editProfile(data)
            .then((res) => {
                window.location.href = "../admin.html";
            })
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
}

function params(res) {
    let name = document.getElementById("inputFirstName");
    let lastName = document.getElementById("inputLastName");
    let email = document.getElementById("inputEmail");

    name.value = res["client"]["name"];
    lastName.value = res["client"]["last_name"];
    email.value = res["client"]["email"];
}
