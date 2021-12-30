export function exists_token() {
    let token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = "../login.html";
    }
}

function delete_token() {
    localStorage.removeItem("token");
    window.location.href = "../login.html";
}
