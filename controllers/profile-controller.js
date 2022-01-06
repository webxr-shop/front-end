import { ProfileService } from "../services/profile-service.js";

export function getProfile() {
    let profileService = new ProfileService();
    var data = {
        token: localStorage.getItem("token"),
    };

    profileService
        .getProfile(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

export function editProfile(e) {
    let profileService = new ProfileService();
    e.preventDefault();
    let check = true;
    if (e.target[3].value != e.target[4].value) {
        check = false;
    }
    if (check) {
        let data = {
            token: localStorage.getItem("token"),
            name: e.target[0].value,
            last_name: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        };
        console.log(data);
        profileService
            .editProfile(data)
            .then((res) => {
                window.location.href = "../index.html";
            })
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}

function params(res) {
    var name = document.getElementById("inputFirstName");
    var lastName = document.getElementById("inputLastName");
    var email = document.getElementById("inputEmail");

    name.value = res["client"]["name"];
    lastName.value = res["client"]["last_name"];
    email.value = res["client"]["email"];
}
