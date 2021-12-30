export class RegisterController {
    register(e) {
        e.preventDefault();

        let data = {
            name: e.target[0].value,
            last_name: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
        };

        newClient(data);
    }
}
