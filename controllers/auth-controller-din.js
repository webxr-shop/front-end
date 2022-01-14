export function token() {
    let token = localStorage.getItem("token");
    console.log(token);

    if (token == null) {
        window.location.href = "../login.html";
    }
}
export function delete_token() {
    localStorage.removeItem("token");
    window.location.href = "../login.html";
}
